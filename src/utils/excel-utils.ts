import ExcelJS from 'exceljs';

export interface TeamMember {
    name: string;
    email: string;
    phone_number: string;
    screenshot_url: string;
}

export const generateTeamExcel = async (members: TeamMember[]): Promise<Buffer> => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Team Members');

    worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone Number', key: 'phone_number', width: 15 },
        { header: 'Screenshot URL', key: 'screenshot_url', width: 40 },
    ];

    // Add rows
    worksheet.addRows(members);

    // Style the header
    worksheet.getRow(1).font = { bold: true };

    // Write to buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as unknown as Buffer;
};

export interface Registration {
    userName: string;
    userEmail: string;
    userPhone: string;
    userCollege: string;
    events: { eventName: string }[];
    paymentStatus: string;
    createdAt: string;
    paymentScreenshot: string;
}

export const generateRegistrationExcel = async (registrations: Registration[]): Promise<Buffer> => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Registrations');

    worksheet.columns = [
        { header: 'Name', key: 'userName', width: 20 },
        { header: 'Email', key: 'userEmail', width: 30 },
        { header: 'Phone', key: 'userPhone', width: 15 },
        { header: 'College', key: 'userCollege', width: 25 },
        { header: 'Events', key: 'events', width: 40 },
        { header: 'Status', key: 'paymentStatus', width: 15 },
        { header: 'Date', key: 'createdAt', width: 20 },
        { header: 'Screenshot', key: 'paymentScreenshot', width: 40 },
    ];

    // Add rows
    const rows = registrations.map(reg => ({
        ...reg,
        events: reg.events?.map(e => e.eventName).join(', ') || '',
        createdAt: new Date(reg.createdAt).toLocaleDateString()
    }));

    worksheet.addRows(rows);

    // Style the header
    worksheet.getRow(1).font = { bold: true };

    // Write to buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as unknown as Buffer;
};
