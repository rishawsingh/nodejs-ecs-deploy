import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SG_API_KEY as string);

const templateId = 'd-16e10c470c4442648b68b46ce6ba8d9b';

export const sendEmail = async (email: string, sale: string, month: string): Promise<boolean> => {
    const msg = {
        to: email,
        from: 'rkirkendall304+omi@gmail.com',
        templateId,
        dynamic_template_data: {
            sale,
            month,
        },
    };
    try {
        const resp = await sgMail.send(msg);
        console.log('sendgrid', resp);
        return true;
    } catch (e) {
        return false;
    }
};
