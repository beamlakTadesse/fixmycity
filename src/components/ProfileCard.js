import Card from '@material-tailwind/react/Card';
import Image from '@material-tailwind/react/Image';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import ProfilePicture from 'assets/img/team-1-800x800.jpg';
import React, {useState, useEffect} from 'react';
export default function ProfileCard() {


    const [userId, setUserId] = useState(4);
    const [users , setUsers] = useState({});
    useEffect(() => {
        // mounted.current = true;
        const url = `http://localhost:8000/v1/admins/users/${userId}`;


        const fetchData = async () => {
          try {
            const response = await fetch(url);
           
            const json = await response.json();
            
            setUsers(json.user);
           
            // console.log("Sectors: ", json.sectors[0].district_name);
          } catch (error) {
            console.log("error", error);
          }
        };

          fetchData();
      
    }, []);
    return (
        <>
        {users &&
        <Card>
            <div className="flex flex-wrap justify-center">
                <div className="w-48 px-4 -mt-24">
                    <Image src={users.image} rounded raised />
                </div>
                </div>

            <CardBody>
            
                <form>
                    <h6 className="text-[#481F01] text-sm mt-9 mb-6 font-bold uppercase">
                        personal Information
                    </h6>
                    <div className="flex flex-wrap text-xs mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Full name : </h1>
                            <h1>{users.full_name}</h1>
                            
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1>Username : </h1>
                            <h1>{users.username}</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Location :</h1>
                            <h1> Addis Ababa / Ethiopia</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1>Phone No. : </h1>
                            <h1>{users.phone_number}</h1>
                        </div>
                        
                    </div>

                    <h6 className="text-[#481F01] text-sm my-6 font-bold uppercase">
                        Sector Information
                    </h6>
                    <div className="flex flex-wrap text-xs mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Sector : ELPA</h1>
                            <h1>ELPA</h1>
                            
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1>Location : </h1>
                            <h1>Addis Ababa / Ethiopia</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Email : </h1>
                            <h1> Elpa@gmail.com</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1>Phone No. : </h1>
                            <h1>+251 9867888899</h1>
                        </div>
                        
                    </div>

                    {/* <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        About Me
                    </h6> */}
                    {/* <div className="flex flex-wrap mt-10 font-light">
                        <Textarea color="purple" placeholder="About Me" />
                    </div> */}
                </form>
            </CardBody>
        </Card>
                }
                </>
    );
}
