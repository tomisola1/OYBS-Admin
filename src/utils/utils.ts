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