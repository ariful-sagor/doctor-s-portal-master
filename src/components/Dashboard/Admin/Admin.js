import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const containerStyle = {
    backgroundColor: "#F4FDFB",
    height:"100%"
}

const Admin = () => {

    const [info, setInfo]= useState({});
    const [file, setFile] = useState(null);

    const handleBlur= e =>{
        const newInfo ={...info};
        newInfo[e.target.name]= e.target.value;
        setInfo(newInfo);
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);

    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file',file)
        formData.append('name',info.name)
        formData.append('email',info.email)


        fetch("http://localhost:5000/addADoctor",{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        })
        .catch(err =>{
            console.log(err)
        })
        alert('Doctor Added Successfully')

    }


    return (
        <section>
            <div style={containerStyle} className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                                                   
                    <form onSubmit={handleSubmit}>
                        <h5>Add A Doctor</h5>
                        <br />
                        <div class="form-group">
                            <label for="exampleInputPassword1">Name</label>
                            <input onBlur={handleBlur} type="text" class="form-control" name="name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input onBlur={handleBlur} type="email" class="form-control" name="email" aria-describedby="emailHelp" />
                        </div>
                        
                        <div class="form-group">
                            <label >Upload a file</label>
                            <input type="file" onChange={handleFileChange}/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>


            
                </div>
                
            </div>
        </section>
    );
};

export default Admin;