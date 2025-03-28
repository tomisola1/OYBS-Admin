import { MonthMap } from "@/types";
import { Margin, Resolution } from "react-to-pdf";
import { toast } from "react-toastify";

export interface params {
    pageSize?: number,
    pageNumber?: number
    emailOrName?: string
    emailAddress?: string
    streak?: string
    insightsShared?: string
    dateJoined?: string
    role?: string
    isHide?: boolean
    exportData?: boolean
    startDate?: string
    endDate?: string
    exportType?: string
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

export const validateURLWithConstructor = (url:string ) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        toast.error("Invalid meeting URL")
        return false;
    }
};

export const pdfOptions = {
   
    resolution: Resolution.HIGH,
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Margin.MEDIUM,
       // default is 'A4'
       format: 'letter',
       // default is 'portrait'
    },
    canvas: {
       // default is 'image/jpeg' for better size performance
       mimeType: 'image/png',
       qualityRatio: 1
    },
    filename: 'file.pdf'
 };