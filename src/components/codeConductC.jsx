import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const CodeConductC = ({updateCodeConductC}) => {
  const SN = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7'
  ]
  const questions = [
    'Dishonesty (-3pt)', 'Theft or inappropraite possession of property (-3pt)', 'Falsification of records/misleading inormation (-3pt)', 'Altering, damaging or destroying property/records (-3pt)', 'Breach/unauthorized disclosure of confidential information (-3pt)', 'Working against best interest of company/conflicts of interest (-3pt)', 'Solicitation, acceptance and payment of bribe and improper gifts (-3pt)'
  ]

  const [formData, setFormData] = useState([
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' },
    { times: '', scores: '', description: '' }
  ])

  const {currentUser} = useSelector((state) => state.user)

  useEffect(() => {
    // Fetch data from the database
    const fetchData = async () => {
      try {
        const res = await fetch(`/report/userReports/${currentUser._id}`);
        const data = await res.json()
        if(res.ok){ 
          // Update codeAData (handling different lengths)
          setFormData(data.codeCData)
        }else {
          setFormData(Array.from({ length: 7 }, () => ({ times: '', scores: '', description: ''})))
      }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    };
  
    fetchData();
  }, []); // Run only once on component mount;

  const handleInputChange = (index, field, value) => {
    setFormData(prevData => {
      const updatedData = [...prevData]
      updatedData[index][field] = value
      return updatedData
    })
    updateCodeConductC(index, field, value)
  }

  return (
    <div className='flex w-full justify-between items-center' style={{ border: '1px solid black' }}>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-black'>
            <th className='text-left'>SN</th>
            <th className='text-left'>ACHIEVEMENT/ COMMENDATION</th>
            <th className='text-left'>TIMES</th>
            <th className='text-left'>SCORES (TIMES X PTS)</th>
            <th className='text-left'>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody className=''>
          {SN.map((sn, index) => (
            <tr key={index} className='border-b border-black'>
              <td>{sn}</td>
              <td>{questions[index]}</td>
              <td>
                <input
                  type="text"
                  value={formData[index].times}
                  onChange={(e) => handleInputChange(index, 'times', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData[index].scores}
                  onChange={(e) => handleInputChange(index, 'scores', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formData[index].description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  style={{ border: '1px solid black' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CodeConductC