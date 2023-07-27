import * as React from "react";
import Box from "@mui/material/Box";
import {Form, Input, Select} from "antd";
import ProfileHeader from "./ProfileHeader";

function ProfilePage() {

    interface ProfileData {
        username: String,
        gender: String,
        weight: number,
        height: number,
        kcal: number
    }

    const [profileD, setProfileData] = React.useState<ProfileData>({
        username: "username",
        gender: "",
        weight: 0,
        height: 0,
        kcal: 0
    });


    // @ts-ignore
    const Data = ({profileData}) => (

        <Box boxShadow={20}
             px={{xs: 3, sm: 1}}
             py={{xs: 3, sm: 1}}
             bgcolor="#white">

            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
            >

                <Form.Item label="Username">
                    <Input disabled={true}
                           defaultValue={"JanKowalski123"}/>
                </Form.Item>
                <Form.Item label="Gender">
                    <Select
                        defaultValue={profileData.gender === "" ? "" : profileData.gender}
                        onChange={(e: string) => {
                            profileData.gender = e.valueOf()
                        }}>
                        <Select.Option value="male">male</Select.Option>
                        <Select.Option value="female">female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Weight">
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        profileData.weight = e.target.value
                    }}/>
                </Form.Item>
                <Form.Item label="Height">
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        profileData.height = e.target.value
                    }}/>
                </Form.Item>
                <Form.Item label="Caloric demand ">
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        profileData.kcal = e.target.value
                    }}/>
                </Form.Item>

            </Form>

        </Box>
    );
    //goal, activity level, calculator

    return (

        <div className="App">
            <ProfileHeader/>
            <Data profileData={profileD}/>
        </div>
    );
}

export default ProfilePage;