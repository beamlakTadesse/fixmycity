import Card from '@material-tailwind/react/Card';
import Image from '@material-tailwind/react/Image';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import ProfilePicture from 'assets/img/team-1-800x800.jpg';

export default function ProfileCard() {
    return (
        <Card>
            <div className="flex flex-wrap justify-center">
                <div className="w-48 px-4 -mt-24">
                    <Image src={ProfilePicture} rounded raised />
                </div>
                </div>

            <CardBody>
            
                <form>
                    <h6 className="text-purple-500 text-sm mt-9 mb-6 font-bold uppercase">
                        personal Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Full name : John Doe</h1>
                            
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1>Email : Johndoe@gmail.com</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1>Location : Addis Ababa / Ethiopia</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1>Phone No. : +251 9867888899</h1>
                        </div>
                    </div>

                    <h6 className="text-purple-500 text-sm my-6 font-bold uppercase">
                        Sector Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <h1>Sector : ELPA</h1>
                        </div>
                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                            <h1>Location : Addis Ababa / Ethiopia</h1>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
                            <h1>Email : Elpa@gmail.com</h1>
                        </div>
                        <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                            <h1>Phone No. : +251 98783733</h1>
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
    );
}
