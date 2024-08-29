import { React, useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import CurrentQuarterDate, {currentQuarterDateRange} from '../components/currentQuarter.jsx'
import FormGrid from '../components/formGrid.jsx'
import EmployeeFormGrid from '../components/EmployeeFormGrid.jsx'
import RecordsAchievement from '../components/recordsAchievement.jsx'
import CodeConductA from '../components/codeConductA.jsx'
import CodeConductB from '../components/codeCoductB.jsx'
import CodeConductC from '../components/codeConductC.jsx'
import NewGoal from '../components/newGoal.jsx'
import { useNavigate } from 'react-router-dom'

export default function Report() {
    const navigate = useNavigate()
    const theme = useTheme()
    const {currentUser} = useSelector((state) => state.user)
    const SN = [
        '1', '', '', '', '',
        '2', '', '', '', '',
        '3', '', '', '', ''
    ]

    const [formData, setFormData] = useState({review: '', reviewDate: currentQuarterDateRange, employeeName: '', idNumber: '', jobTitle: '', department: currentUser.department, division: '', unit: '', managerName: '', supervisorName: '', commentOne: '', commentTwo: '', commentThree: '', dep: currentUser.department })
    const [formGridData, setFormGridData] = useState(Array.from({ length: 13 }, () => ({ selfRating: '', supervisorRating: '', average: '' })))
    const [employeeFormData, setEmployeeFormData] = useState(Array.from({ length: 6 }, () => ({ employeeTopJobDescription: '', supervisorRating: '', average: '', supervisorComment: '' })))
    const [recordData, setRecordData] = useState(Array.from({ length: 10 }, () => ({ times: '', scores: '', description: ''})))
    const [codeAData, setCodeAData] = useState(Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
    const [codeBData, setCodeBData] = useState(Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
    const [codeCData, setCodeCData] = useState(Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
    const [newGoalData, setNewGoalData] = useState(Array.from({ length: 15 }, () => ({ description: '' })))
    const [error, setError] = useState(null)

    useEffect(() => {
        // Fetch data from the database
        const fetchData = async () => {
          try {
            const res = await fetch(`/report/userReports/${currentUser._id}`);
            const data = await res.json();
            if(res.ok) {
                // Update the state with the fetched data
                setFormData({ review: data.review, reviewDate: data.reviewDate, employeeName: data.employeeName, idNumber: data.idNumber, jobTitle: data.jobTitle, department: data.department, division: data.division, unit: data.unit,managerName: data.managerName, supervisorName: data.supervisorName, commentOne: data.commentOne, commentTwo: data.commentTwo, commentThree: data.commentThree, department: currentUser.department, dep: currentUser.department })
        
                // Update formGridData (handling different lengths)
                setFormGridData(
                data.formGridData.map((item, index) => ({
                    selfRating: item.selfRating || "",
                    supervisorRating: item.supervisorRating || "",
                    average: item.average || "",
                }))
                .slice(0, 13)
                );
        
                // Update employeeFormData (handling different lengths)
                setEmployeeFormData(
                data.employeeFormData.map((item, index) => ({
                    employeeTopJobDescription: item.employeeTopJobDescription || "",
                    supervisorRating: item.supervisorRating || "",
                    average: item.average || "",
                    supervisorComment: item.supervisorComment || "",
                }))
                .slice(0, 6)
                );
        
                // Update recordData (handling different lengths)
                setRecordData(
                data.recordData.map((item, index) => ({
                    times: item.times || "",
                    scores: item.scores || "",
                    description: item.description || "",
                }))
                .slice(0, 10)
                );
        
                // Update codeAData (handling different lengths)
                setCodeAData(
                data.codeAData.map((item, index) => ({
                    times: item.times || "",
                    scores: item.scores || "",
                    description: item.description || "",
                }))
                .slice(0, 7)
                );
        
                // Update codeBData (handling different lengths)
                setCodeBData(
                data.codeBData.map((item, index) => ({
                    times: item.times || "",
                    scores: item.scores || "",
                    description: item.description || "",
                }))
                .slice(0, 7)
                );
        
                // Update codeCData (handling different lengths)
                setCodeCData(
                data.codeCData.map((item, index) => ({
                    times: item.times || "",
                    scores: item.scores || "",
                    description: item.description || "",
                }))
                .slice(0, 7)
                );
        
                // Update newGoalData (handling different lengths)
                setNewGoalData(
                data.newGoalData.map((item, index) => ({
                    description: item.description || "",
                }))
                .slice(0, 15)
                );
            } else {
                setFormData({ review: '', reviewDate: currentQuarterDateRange, employeeName: '', idNumber: '', jobTitle: '', department: currentUser.department, division: '', unit: '', managerName: '', supervisorName: '', commentOne: '', commentTwo: '', commentThree: '', dep: currentUser.department });
                setFormGridData(Array.from({ length: 13 }, () => ({ selfRating: '', supervisorRating: '', average: '' })));
                setEmployeeFormData(Array.from({ length: 6 }, () => ({ employeeTopJobDescription: '', supervisorRating: '', average: '', supervisorComment: '' })));
                setRecordData(Array.from({ length: 10 }, () => ({ times: '', scores: '', description: ''})))
                setCodeAData(Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
                setCodeBData(Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
                setCodeCData(Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
                setNewGoalData(Array.from({ length: 15 }, () => ({ description: '' })))
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []); // Run only once on component mount;

    const updateFormGridData = (index, field, value) => {
        setFormGridData(prevData => {
          const updatedData = [...prevData];
          updatedData[index][field] = value;
    
          // Update the average for all rows
          for (let i = 0; i < updatedData.length; i++) {
            if (updatedData[i].selfRating !== '' && updatedData[i].supervisorRating !== '') {
              const supervisorRatings = updatedData.slice(i).map(row => parseFloat(row.supervisorRating));
              const average = supervisorRatings.reduce((sum, rating) => sum + rating, 0) / supervisorRatings.length;
              updatedData[i].average = average.toFixed(2);
            } else {
              updatedData[i].average = '';
            }
          }
          return updatedData;
        });
      }

      const updateEmployeeFormGridData = (index, field, value) => {
        setEmployeeFormData(prevData => {
          const updatedData = [...prevData];
          updatedData[index][field] = value;
    
          // Update the average for all rows
          for (let i = 0; i < updatedData.length; i++) {
            if (updatedData[i].supervisorRating !== '') {
              const supervisorRatings = updatedData.slice(i).map(row => parseFloat(row.supervisorRating));
              const average = supervisorRatings.reduce((sum, rating) => sum + rating, 0) / supervisorRatings.length;
              updatedData[i].average = average.toFixed(2);
            } else {
              updatedData[i].average = '';
            }
          }
          return updatedData;
        })
      }

    const updateRecordData = (index, field, value) => {
        setRecordData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }

    const updateCodeConductA = (index, field, value) => {
        setCodeAData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }
    const updateCodeConductB = (index, field, value) => {
        setCodeBData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }
    const updateCodeConductC = (index, field, value) => {
        setCodeCData(prevData => {
          const updatedData = [...prevData]
          updatedData[index][field] = value
          return updatedData
        })
    }
    const updateNewGoal = (index, field, value) => {
        setNewGoalData(prevData => {
          const updatedData = [...prevData];
          updatedData[index] = { ...updatedData[index], [field]: value };
          return updatedData;
        })
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const combinedState = {
          ...formData,
          formGridData: [...formGridData],
          employeeFormData: [...employeeFormData],
          recordData: [...recordData],
          codeAData: [...codeAData],
          codeBData: [...codeBData],
          codeCData: [...codeCData],
          newGoalData: [...newGoalData],
        };
    
        try {
          const res = await fetch(`/report/reports/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedState),
          });
    
          if (!res.ok) {
            const errorData = await res.json();
            setError(errorData.message);
            return; // Stop navigation if there's an error
          }
    
          const data = await res.json();
          console.log(data);
          navigate('/');
          setError(null);
        } catch (error) {
          console.log(error);
          setError('An error occurred. Please try again later.');
        }
      }

    function handleChange(event) {
        const{id, value, name} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
      }
    

    return (
        <div className='p-5 w-screen h-screen' style={{ backgroundColor: theme.palette.secondary[700], height: '100%' }}>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-blue-700 bg-blue-100 w-full text-center p-1 font-bold uppercase'>Employee performance Appraisal Form</h2>
                <h5 className='bg-gray-300 text-black w-full text-center p-1 uppercase font-bold'>Background Information</h5>
            </div>
            {formData ? (<form onSubmit={handleSubmit}>
                <div className='flex flex-col text-black w-full' style={{ border: '1px solid gray', backgroundColor: '#fff' }}>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid gray' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Review Period:</h5>
                            </div>
                            <div className='flex-1'>
                                <select className=' focus:outline-none' id='review' name='review' onChange={handleChange} value={formData.review}>
                                    <option value="">Review Period</option>
                                    <option value="first">January - March</option>
                                    <option value="second">April - June</option>
                                    <option value="third">July - September</option>
                                    <option value="fourth">October - December</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Review Date:</h5>
                            </div>
                            <div className='flex-1'>
                                <CurrentQuarterDate/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Employee Name:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='employeeName' onChange={handleChange} value={formData.employeeName}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>ID Number:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='idNumber' onChange={handleChange} value={formData.idNumber}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Job Title/Rank:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='jobTitle' onChange={handleChange} value={formData.jobTitle}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Department:</h5>
                            </div>
                            <div className='flex-1'>
                                <p className='focus:outline-none' id='department' name='department' onChange={handleChange} value={formData.department}>
                                    {currentUser.department}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Division:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='division' onChange={handleChange} value={formData.division}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Unit:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='unit' onChange={handleChange} value={formData.unit}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Manager's Name:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='managerName' onChange={handleChange} value={formData.managerName}/>
                            </div>
                        </div>
                        <div className='flex flex-1 justify-between p-1'>
                            <div className='flex-1'>
                                <h5 className=''>Evaluated by (Supervisor) Name and Sign:</h5>
                            </div>
                            <div className='flex-1'>
                                <input type='text' style={{ border: '1px solid black' }} name='supervisorName' onChange={handleChange} value={formData.supervisorName}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>General performance Rating (Max.Score = 30, Factor = 5.0)</h5>
                    </div>
                    <FormGrid updateFormGridData={updateFormGridData}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>Employee Job Description Rating (Max.Score = 30, Factor = 5.0)</h5>
                    </div>
                    <EmployeeFormGrid updateEmployeeFormGridData={updateEmployeeFormGridData}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>Records of achievement (Max.Score = 30, Factor = 5.0)</h5>
                    </div>
                    <RecordsAchievement updateRecordData={updateRecordData}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>Conduct and disciplinary Actions (Max.Score = 30)</h5>
                    </div>
                    <CodeConductA updateCodeConductA={updateCodeConductA}/>
                    <h5 className='bg-blue-300' style={{ border: '1px solid black' }}>B</h5>
                    <CodeConductB updateCodeConductB={updateCodeConductB}/>
                    <h5 className='bg-blue-300' style={{ border: '1px solid black' }}>C</h5>
                    <CodeConductC updateCodeConductC={updateCodeConductC}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>New Project Goals (Max.Score = 5)</h5>
                    </div>
                    <NewGoal updateNewGoal={updateNewGoal}/>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-cyan-900 bg-cyan-400 w-full text-center p-3 font-bold uppercase'></h2>
                        <h5 className='bg-blue-600 text-black w-full text-center p-1 uppercase font-bold'>General comments</h5>
                    </div>
                    <div className='flex flex-col'>
                        <div>
                            <h5>
                                1. What do you consider as the major strength of this employee and in what further area can the company make good use of such strength?
                            </h5>
                            <textarea name="commentOne" className='w-full' style={{ border: '1px solid black' }} onChange={handleChange} value={formData.commentOne}></textarea>
                        </div>
                        <div>
                            <h5>
                                2. In what major area does the employee require improvement and suggest what can be done by the company and employee in such area?
                            </h5>
                            <textarea name="commentTwo" className='w-full' style={{ border: '1px solid black' }} onChange={handleChange} value={formData.commentTwo}></textarea>
                        </div>
                        <div>
                            <h5>
                                3. What specific needs (e.g. training, facilities, counselling, redeployment, separation etc) does the employee require to further improve his/her contribution?
                            </h5>
                            <textarea name="commentThree" className='w-full' style={{ border: '1px solid black' }} onChange={handleChange} value={formData.commentThree}></textarea>
                        </div>
                    </div>
                </div>
                {error && (<div className="error"> <p>{error}</p></div>)}
                <button className='p-3 rounded-lg uppercase text-xl mt-4' style={{ backgroundColor: theme.palette.primary[700] }}>Submit</button>
            </form>) : (<div>Loading...</div>)}
            
        </div>
    )
}
