import { Request, NextFunction } from 'express';
import { faker } from '@faker-js/faker';

import { AccountsModel } from 'models';
import { MongodbSubmitToElasticSearch } from 'libs/elasticsearch';
import { MongoEs } from 'resources';

export const randomUsers = async (req: Request, next: NextFunction) => {
  try {
    const surname = [
      {
        name: 'Nguyễn',
      },
      {
        name: 'Trần',
      },
      {
        name: 'Lê',
      },
      {
        name: 'Phạm',
      },
      {
        name: 'Huỳnh',
      },
      {
        name: 'Hoàng',
      },
      {
        name: 'Võ',
      },
      {
        name: 'Vũ',
      },
      {
        name: 'Phan',
      },
      {
        name: 'Trương',
      },
      {
        name: 'Bùi',
      },
      {
        name: 'Đặng',
      },
      {
        name: 'Đỗ',
      },
      {
        name: 'Ngô',
      },
      {
        name: 'Hồ',
      },
      {
        name: 'Dương',
      },
      {
        name: 'Đinh',
      },
      {
        name: 'Đoàn',
      },
      {
        name: 'Lâm',
      },
      {
        name: 'Mai',
      },
      {
        name: 'Trịnh',
      },
      {
        name: 'Đào',
      },
      {
        name: 'Cao',
      },
      {
        name: 'Lý',
      },
      {
        name: 'Hà',
      },
      {
        name: 'Lưu',
      },
      {
        name: 'Lương',
      },
      {
        name: 'Thái',
      },
      {
        name: 'Châu',
      },
      {
        name: 'Tạ',
      },
      {
        name: 'Phùng',
      },
      {
        name: 'Tô',
      },
      {
        name: 'Vương',
      },
      {
        name: 'Văn',
      },
      {
        name: 'Tăng',
      },
      {
        name: 'Quách',
      },
      {
        name: 'Lại',
      },
      {
        name: 'Hứa',
      },
      {
        name: 'Thạch',
      },
      {
        name: 'Diệp',
      },
      {
        name: 'Từ',
      },
      {
        name: 'Chu',
      },
      {
        name: 'La',
      },
      {
        name: 'Đàm',
      },
      {
        name: 'Tống',
      },
      {
        name: 'Giang',
      },
      {
        name: 'Chung',
      },
      {
        name: 'Triệu',
      },
      {
        name: 'Kiều',
      },
      {
        name: 'Hồng',
      },
      {
        name: 'Trang',
      },
      {
        name: 'Đồng',
      },
      {
        name: 'Danh',
      },
      {
        name: 'Lư',
      },
      {
        name: 'Lữ',
      },
      {
        name: 'Thân',
      },
      {
        name: 'Kim',
      },
      {
        name: 'Mã',
      },
      {
        name: 'Bạch',
      },
      {
        name: 'Liêu',
      },
      {
        name: 'Tiêu',
      },
      {
        name: 'Dư',
      },
      {
        name: 'Bành',
      },
      {
        name: 'Âu',
      },
      {
        name: 'Tôn',
      },
      {
        name: 'Khưu',
      },
      {
        name: 'Sơn',
      },
      {
        name: 'Tất',
      },
      {
        name: 'Nghiêm',
      },
      {
        name: 'Lục',
      },
      {
        name: 'Quan',
      },
      {
        name: 'Phương',
      },
      {
        name: 'Mạc',
      },
      {
        name: 'Lai',
      },
      {
        name: 'Vòng',
      },
      {
        name: 'Mạch',
      },
      {
        name: 'Thiều',
      },
      {
        name: 'Trà',
      },
      {
        name: 'Đậu',
      },
      {
        name: 'Nhan',
      },
      {
        name: 'Lã',
      },
      {
        name: 'Trình',
      },
      {
        name: 'Ninh',
      },
      {
        name: 'Vi',
      },
      {
        name: 'Biện',
      },
      {
        name: 'Hàng',
      },
      {
        name: 'Ôn',
      },
      {
        name: 'Chế',
      },
      {
        name: 'Nhâm',
      },
      {
        name: 'Tôn Nữ',
      },
      {
        name: 'Thi',
      },
      {
        name: 'Doãn',
      },
      {
        name: 'Khổng',
      },
      {
        name: 'Phù',
      },
      {
        name: 'Đường',
      },
      {
        name: 'Ông',
      },
      {
        name: 'Tôn Thất',
      },
      {
        name: 'Ngụy',
      },
      {
        name: 'Viên',
      },
      {
        name: 'Tào',
      },
      {
        name: 'Cù',
      },
      {
        name: 'Kha',
      },
    ];

    const name = [
      {
        name: 'Huy',
      },
      {
        name: 'Khang',
      },
      {
        name: 'Bảo',
      },
      {
        name: 'Minh',
      },
      {
        name: 'Phúc',
      },
      {
        name: 'Anh',
      },
      {
        name: 'Khoa',
      },
      {
        name: 'Phát',
      },
      {
        name: 'Đạt',
      },
      {
        name: 'Khôi',
      },
      {
        name: 'Long',
      },
      {
        name: 'Nam',
      },
      {
        name: 'Duy',
      },
      {
        name: 'Quân',
      },
      {
        name: 'Kiệt',
      },
      {
        name: 'Thịnh',
      },
      {
        name: 'Tuấn',
      },
      {
        name: 'Hưng',
      },
      {
        name: 'Hoàng',
      },
      {
        name: 'Hiếu',
      },
      {
        name: 'Nhân',
      },
      {
        name: 'Trí',
      },
      {
        name: 'Tài',
      },
      {
        name: 'Phong',
      },
      {
        name: 'Nguyên',
      },
      {
        name: 'An',
      },
      {
        name: 'Phú',
      },
      {
        name: 'Thành',
      },
      {
        name: 'Đức',
      },
      {
        name: 'Dũng',
      },
      {
        name: 'Lộc',
      },
      {
        name: 'Khánh',
      },
      {
        name: 'Vinh',
      },
      {
        name: 'Tiến',
      },
      {
        name: 'Nghĩa',
      },
      {
        name: 'Thiện',
      },
      {
        name: 'Hào',
      },
      {
        name: 'Hải',
      },
      {
        name: 'Đăng',
      },
      {
        name: 'Quang',
      },
      {
        name: 'Lâm',
      },
      {
        name: 'Nhật',
      },
      {
        name: 'Trung',
      },
      {
        name: 'Thắng',
      },
      {
        name: 'Tú',
      },
      {
        name: 'Hùng',
      },
      {
        name: 'Tâm',
      },
      {
        name: 'Sang',
      },
      {
        name: 'Sơn',
      },
      {
        name: 'Thái',
      },
      {
        name: 'Cường',
      },
      {
        name: 'Vũ',
      },
      {
        name: 'Toàn',
      },
      {
        name: 'Ân',
      },
      {
        name: 'Thuận',
      },
      {
        name: 'Bình',
      },
      {
        name: 'Trường',
      },
      {
        name: 'Danh',
      },
      {
        name: 'Kiên',
      },
      {
        name: 'Phước',
      },
      {
        name: 'Thiên',
      },
      {
        name: 'Tân',
      },
      {
        name: 'Việt',
      },
      {
        name: 'Khải',
      },
      {
        name: 'Tín',
      },
      {
        name: 'Dương',
      },
      {
        name: 'Tùng',
      },
      {
        name: 'Quý',
      },
      {
        name: 'Hậu',
      },
      {
        name: 'Trọng',
      },
      {
        name: 'Triết',
      },
      {
        name: 'Luân',
      },
      {
        name: 'Phương',
      },
      {
        name: 'Quốc',
      },
      {
        name: 'Thông',
      },
      {
        name: 'Khiêm',
      },
      {
        name: 'Hòa',
      },
      {
        name: 'Thanh',
      },
      {
        name: 'Tường',
      },
      {
        name: 'Kha',
      },
      {
        name: 'Vỹ',
      },
      {
        name: 'Bách',
      },
      {
        name: 'Khanh',
      },
      {
        name: 'Mạnh',
      },
      {
        name: 'Lợi',
      },
      {
        name: 'Đại',
      },
      {
        name: 'Hiệp',
      },
      {
        name: 'Đông',
      },
      {
        name: 'Nhựt',
      },
      {
        name: 'Giang',
      },
      {
        name: 'Kỳ',
      },
      {
        name: 'Phi',
      },
      {
        name: 'Tấn',
      },
      {
        name: 'Văn',
      },
      {
        name: 'Vương',
      },
      {
        name: 'Công',
      },
      {
        name: 'Hiển',
      },
      {
        name: 'Linh',
      },
      {
        name: 'Ngọc',
      },
      {
        name: 'Vĩ',
      },
    ];

    for (let i = 0; i < 500; i++) {
      const fullname =
        surname[Math.floor(Math.random() * (surname.length - 1))].name +
        ' ' +
        name[Math.floor(Math.random() * (name.length - 1))].name +
        ' ' +
        name[Math.floor(Math.random() * (name.length - 1))].name;

      // const accounts = new AccountsModel({
      //   username: fullname.toLowerCase().split(' ').join('') + Math.floor(Math.random() * 999999999),
      //   password: 'admin',
      //   fullname: fullname,
      //   avatar: faker.image.avatar(),
      // });

      // await accounts.save();
      const okok = await MongoEs.save({
        username: fullname.toLowerCase().split(' ').join('') + Math.floor(Math.random() * 999999999),
        password: 'admin',
        fullname: fullname,
        avatar: faker.image.avatar(),
      });
    }

    return 'OK';
  } catch (error) {
    next(error);
  }
};
