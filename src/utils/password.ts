import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password);
};

export const comparePassword = (plain: string, hash: string): boolean => {
    return bcrypt.compareSync(plain, hash);
};
