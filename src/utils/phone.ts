import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

export const parsePhoneNumber = (phoneNumber: string): string => {
    const parsedNumber = phoneUtil.parse(phoneNumber, 'US');
    return phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
};
