#### Những thứ cần thiết:
- PHP
- NodeJs
- Composer

#### Chắc chắn rằng chạy được ba lệnh sau trên cmd  đây mà không có lỗi

```
php -v
```
```
node -v
```
```
composer -v
```
#### Tải driver MôngDB ở đây https://pecl.php.net/package/mongodb/1.12.0/windows rồi bỏ vào xampp/php/ext
#### Mở cmd và trỏ đến thư mục của project và chạy các lệnh sau
*Cài đặt các thư viện cần thiết cho React*
```
npm i
```
*Cài đặt các thư viện cần thiết cho Laravel*
```
composer i
```

#### Sửa file .env.example trong project thành .env (~~.env.example~~ -> .env	)
#### Thêm 2 dòng này vào .env
```
GOOGLE_CLIENT_ID=389042498386-7qmq4ehsdcf1b70qup9sbsfspm6bh58c.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```
#### Tạo APP_KEY cho Laravel
```
php artisan key:generate
```

#### Cài đặt cho Database
- Bật xampp lên và start 2 cái đầu
- Mở PHP MyAdmin tạo database tên là: `studymate`
- Trong file .env `DB_DATABASE=studymate`

*Chạy lệnh này để tạo bảng trong database*
```
php artisan migrate
```
#### Chạy chương trình
Mở 2 terminal và mỗi cái chạy lệnh sau
*Chạy server*
```
php artisan serve
```
*Merge file js khi có file react thay đổi*
```
npm run watch
```