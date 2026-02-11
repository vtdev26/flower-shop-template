<?php
/**
 * Send Order Confirmation Email
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

$to = $data['email'];
$subject = "Xác nhận đơn hàng - Rose's Garden";

$productsList = '';
foreach ($data['products'] as $product) {
    $subtotal = $product['price'] * $product['quantity'];
    $productsList .= sprintf(
        "%s x %d = %s đ\n",
        $product['name'],
        $product['quantity'],
        number_format($subtotal, 0, ',', '.')
    );
}

$message = "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 5px; }
        .order-details { margin: 20px 0; border: 1px solid #ddd; padding: 15px; }
        .product-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .product-table th, .product-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        .product-table th { background-color: #f5f5f5; font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; color: #e74c3c; margin: 15px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Xác Nhận Đơn Hàng - Rose's Garden</h2>
        </div>
        
        <p>Kính gửi <strong>{$data['name']}</strong>,</p>
        <p>Cảm ơn bạn đã đặt hàng tại Rose's Garden!</p>
        <p style='background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 15px 0;'>
            <strong>⏱️ Lưu ý quan trọng:</strong> Chúng tôi sẽ gọi điện xác nhận đơn hàng của bạn trong vòng <strong>30 phút</strong> tới. Vui lòng chắc chắn điện thoại của bạn có thể nhận cuộc gọi.
        </p>
        
        <div class='order-details'>
            <h3>Chi tiết đơn hàng</h3>
            <p><strong>Ngày đặt:</strong> " . date('d/m/Y H:i') . "</p>
            <p><strong>Ngày giao hàng:</strong> {$data['deliveryDate']}</p>
            <p><strong>Giờ giao hàng:</strong> {$data['deliveryTime']}</p>
            
            <table class='product-table'>
                <thead>
                    <tr>
                        <th>Sản Phẩm</th>
                        <th style='text-align: center;'>Số Lượng</th>
                        <th style='text-align: right;'>Giá</th>
                        <th style='text-align: right;'>Thành Tiền</th>
                    </tr>
                </thead>
                <tbody>";

foreach ($data['products'] as $product) {
    $subtotal = $product['price'] * $product['quantity'];
    $message .= "<tr>
                        <td>{$product['name']}</td>
                        <td style='text-align: center;'>{$product['quantity']}</td>
                        <td style='text-align: right;'>" . number_format($product['price'], 0, ',', '.') . " đ</td>
                        <td style='text-align: right;'>" . number_format($subtotal, 0, ',', '.') . " đ</td>
                    </tr>";
}

$message .= "
                </tbody>
            </table>
            
            <div class='total'>
                Tổng tiền: " . number_format($data['totalPrice'], 0, ',', '.') . " đ
            </div>";

if (!empty($data['message'])) {
    $message .= "<p><strong>Ghi chú:</strong> {$data['message']}</p>";
}

$message .= "
        </div>
        
        <div class='order-details'>
            <h4>Thông tin liên lạc</h4>
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi:</p>
            <ul>
                <li>📱 Điện thoại: 0377765415</li>
                <li>📧 Email: contact@rosesgarden.vn</li>
                <li>📍 Địa chỉ: 185 Giảng Võ, Đống Đa, Hà Nội</li>
                <li>🕐 Giờ mở cửa: 08:00 - 21:00 (Thứ Hai - Chủ Nhật)</li>
            </ul>
        </div>
        
        <div class='footer'>
            <p>Rose's Garden - Chuyên cung cấp hoa lan đột biến cao cấp</p>
            <p>© 2024 Rose's Garden. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";

$headers = "From: giacatdu1101@gmail.com\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";

// Gửi email thông báo cho khách hàng (noreply - không cần xác nhận)
$sent_to_customer = mail($to, $subject, $message, $headers);

// Gửi email thông báo cho admin
$admin_email = 's1thanhs2@gmail.com';
$admin_subject = "Đơn hàng mới từ khách - Rose's Garden #" . date('YmdHis');
$admin_message = "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #e74c3c; color: white; padding: 20px; border-radius: 5px; }
        .order-details { margin: 20px 0; border: 1px solid #ddd; padding: 15px; }
        .product-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .product-table th, .product-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        .product-table th { background-color: #f5f5f5; font-weight: bold; }
        .total { font-size: 18px; font-weight: bold; color: #e74c3c; margin: 15px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>⚠️ ĐƠN HÀNG MỚI CẦN XỬ LÝ</h2>
        </div>
        
        <div class='order-details'>
            <h3>Thông tin khách hàng</h3>
            <p><strong>Tên:</strong> {$data['name']}</p>
            <p><strong>Email:</strong> {$data['email']}</p>
            <p><strong>Điện thoại:</strong> {$data['phone']}</p>
        </div>
        
        <div class='order-details'>
            <h3>Chi tiết đơn hàng</h3>
            <p><strong>Ngày đặt:</strong> " . date('d/m/Y H:i') . "</p>
            <p><strong>Ngày giao hàng:</strong> {$data['deliveryDate']}</p>
            <p><strong>Giờ giao hàng:</strong> {$data['deliveryTime']}</p>
            
            <table class='product-table'>
                <thead>
                    <tr>
                        <th>Sản Phẩm</th>
                        <th style='text-align: center;'>Số Lượng</th>
                        <th style='text-align: right;'>Giá</th>
                        <th style='text-align: right;'>Thành Tiền</th>
                    </tr>
                </thead>
                <tbody>";

foreach ($data['products'] as $product) {
    $subtotal = $product['price'] * $product['quantity'];
    $admin_message .= "<tr>
                        <td>{$product['name']}</td>
                        <td style='text-align: center;'>{$product['quantity']}</td>
                        <td style='text-align: right;'>" . number_format($product['price'], 0, ',', '.') . " đ</td>
                        <td style='text-align: right;'>" . number_format($subtotal, 0, ',', '.') . " đ</td>
                    </tr>";
}

$admin_message .= "
                </tbody>
            </table>
            
            <div class='total'>
                Tổng tiền: " . number_format($data['totalPrice'], 0, ',', '.') . " đ
            </div>";

if (!empty($data['message'])) {
    $admin_message .= "<p><strong>Ghi chú từ khách:</strong> {$data['message']}</p>";
}

$admin_message .= "
    </div>
</body>
</html>";

$admin_headers = "From: giacatdu1101@gmail.com\r\n";
$admin_headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$admin_headers .= "MIME-Version: 1.0\r\n";

// Gửi email thông báo cho admin
$sent_to_admin = mail($admin_email, $admin_subject, $admin_message, $admin_headers);

if ($sent_to_customer && $sent_to_admin) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email đã gửi thành công'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Gửi email thất bại'
    ]);
}

?>