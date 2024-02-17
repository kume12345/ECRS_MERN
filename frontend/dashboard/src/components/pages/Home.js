import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Label } from 'recharts';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function Home(props) {
    const { user } = useAuthContext();
    const link = "https://henok.us";
    const [crud, setCrud] = useState([]);
    const target = "_blank";
    const [forest, setForest] = useState(0);
    const [wildLife, setWildLife] = useState(0);
    const { _id } = useParams();
    const [addOfficer, setAddOfficer] = useState("")
    const [addUser, setAddUser] = useState("")
    const [editUser, setEditUser] = useState("")
    const [editCrimes, setEditCrimes] = useState("")
    const [approval, setApproval] = useState("")
	

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
	
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`} {data[index].name}
			</text>
		);
	};
	

    useEffect(() => {
        async function getCrudById() {
            try {
                const response = await axios.get(`http://localhost:4000/api/admin`);
                setCrud(response.data);

                // Count occurrences of 'Forest' and 'Wildlife' crimes
                let forestCount = 0;
                let wildLifeCount = 0;
                response.data.forEach(item => {
                    if (item.crimeType === 'Forest') {
                        forestCount++;
                    } else if (item.crimeType === 'Wildlife') {
                        wildLifeCount++;
                    }
                });

                setForest(forestCount);
                setWildLife(wildLifeCount);
            } catch (error) {
                console.log("error", error);
            }
        }
        getCrudById();
        if(!user){
            setAddOfficer("/login")
            setAddUser("/login")
            setEditUser("/login")
            setEditCrimes("/login")
            setApproval("/login")
        }else{
            setAddOfficer("/users")
            setAddUser("/users")
            setEditUser("/cruds/new")
            setEditCrimes("/cruds")
            setApproval("/officer")
        }
    }, [_id]);

    const data = [
        { name: "Forest", students: forest },
        { name: 'Wildlife', students: wildLife },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="container_main">
			<div className="div1">
			<h1>Environmental Crime Reporting System  Dashboard</h1>
                {
                    user && user.role === "Admin" && (
                        <>
                            <Link to={addOfficer} className="btns btn-primary">
                                Add Officers
                            </Link>
                            <Link to={editUser} className="btns btn-primary">
                                Edit Users
                            </Link>
                            <Link to={editUser} className="btns btn-primary"> {/* Assuming you intended to navigate to a different path for adding users */}
                                Add Users
                            </Link>
                            <Link to={editCrimes} className="btns btn-primary">
                                Edit Crimes
                            </Link>
                        </>
                    )
                }
                {
                    user && user.role === "Officer" && (
                        <>
                            <Link to={approval} className="btns btn-primary">
                                Give Approvals
                            </Link>
                            
                        </>
                    )
                }
			</div>
			
			<div className="div9">
            <PieChart width={700} height={700}>
                <Pie data={data} dataKey="students" nameKey="name" outerRadius={250} fill="green" labelLine={false} label={renderCustomizedLabel}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
				
            </PieChart>
			<p>All crime incidents</p>
			</div>
        </div>
    );
}

export default Home;
