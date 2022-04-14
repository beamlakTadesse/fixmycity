import Card from '@material-tailwind/react/Card';
import Image from '@material-tailwind/react/Image';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import ProfilePicture from 'assets/img/team-1-800x800.jpg';

export default function ProfileCard() {
    const products = useSelector((state) => state.allProducts.product);
    console.log(products);
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
                    <div className="flex flex-wrap text-xs mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Full name : </h1>
                            <h1>John Doe</h1>
                            
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Email : </h1>
                            <h1>Johndoe@gmail.com</h1>
                        </div>
                        <div  className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Location :</h1>
                            <h1> Addis Ababa / Ethiopia</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Phone No. : </h1>
                            <h1>+251 9867888899</h1>
                        </div>
                        
                    </div>

                    <h6 className="text-purple-500 text-sm my-6 font-bold uppercase">
                        Sector Information
                    </h6>
                    <div className="flex flex-wrap text-xs mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Sector :</h1>
                            <h1>ELPA</h1>
                            
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Location : </h1>
                            <h1>Addis Ababa / Ethiopia</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Email : </h1>
                            <h1> Elpa@gmail.com</h1>
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <h1 className = 'font-medium'>Phone No. : </h1>
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
    );
}
