import { MonthMap } from "@/types";

export interface params {
    pageSize?: number,
    pageNumber?: number
}

export function transformPhoneNumber(phoneNumber:string) {
    let firstNumber = phoneNumber.split('')[0]
    if (firstNumber==='0'){
        let modifiedNumber = phoneNumber.substring(1);   
        let newPhoneNumber = '234' + modifiedNumber;
        return newPhoneNumber;
    }
    return phoneNumber;
}

export const Roles = [
    'User',
    'Admin',
    'Super Admin',
    'Manager',
    'Support',
    'Finance',
    'Tech',
]

export const monthNames:MonthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec"
};