<?php
/**
 * Process Order - Save order and send email
 * Endpoint: POST /forms/process-order.php
 * Email only - No SMS/Phone costs
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'phone', 'deliveryDate', 'products'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Generate Order ID
$orderId = 'ORD-' . date('YmdHis') . '-' . substr(md5(time()), 0, 6);

// Prepare order data for storage
$orderData = [
    'orderId' => $orderId,
    'name' => htmlspecialchars($data['name']),
    'email' => htmlspecialchars($data['email']),
    'phone' => htmlspecialchars($data['phone']),
    'deliveryDate' => $data['deliveryDate'],
    'deliveryTime' => $data['deliveryTime'] ?? 'Không chỉ định',
    'products' => $data['products'],
    'totalPrice' => $data['totalPrice'],
    'message' => htmlspecialchars($data['message'] ?? ''),
    'timestamp' => $data['timestamp'],
    'createdAt' => date('Y-m-d H:i:s')
];

// Log order to file
$logFile = dirname(__FILE__) . '/../orders.log';
file_put_contents($logFile, json_encode($orderData) . "\n", FILE_APPEND);

// Send confirmation email to customer
sendCustomerEmail($orderData);

// Send notification to admin
sendAdminNotification($orderData);

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'orderId' => $orderId,
    'message' => 'Đơn hàng đã được tạo thành công',
    'data' => [
        'orderId' => $orderId,
        'createdAt' => $orderData['createdAt']
    ]
]);

/**
 * Send email to customer
 */
function sendCustomerEmail($orderData)
{
    $to = $orderData['email'];
    $subject = "Xác nhận đơn hàng - Rose's Garden #" . $orderData['orderId'];

    $productsList = '';
    foreach ($orderData['products'] as $product) {
        $subtotal = $product['price'] * $product['quantity'];
        $productsList .= "{$product['name']} x {$product['quantity']} = " . number_format($subtotal, 0, ',', '.') . "đ\n";
    }

    $message = "Kính gửi {$orderData['name']},\n\n";
    $message .= "Cảm ơn bạn đã đặt hàng tại Rose's Garden!\n\n";
    $message .= "CHI TIẾT ĐƠN HÀNG:\n";
    $message .= "=====================================\n";
    $message .= "Mã đơn hàng: {$orderData['orderId']}\n";
    $message .= "Ngày đặt: {$orderData['createdAt']}\n";
    $message .= "Ngày giao hàng: {$orderData['deliveryDate']}\n";
    $message .= "Giờ giao hàng: {$orderData['deliveryTime']}\n\n";
    $message .= "SẢN PHẨM:\n";
    $message .= $productsList . "\n";
    $message .= "=====================================\n";
    $message .= "Tổng tiền: " . number_format($orderData['totalPrice'], 0, ',', '.') . "đ\n";
    $message .= "=====================================\n\n";

    if (!empty($orderData['message'])) {
        $message .= "Ghi chú: {$orderData['message']}\n\n";
    }

    $message .= "Chúng tôi sẽ liên hệ với bạn trong vòng 2 giờ để xác nhận.\n";
    $message .= "Nếu có thắc mắc, vui lòng gọi: 0377765415\n\n";
    $message .= "Rose's Garden\n";
    $message .= "185 Giảng Võ, Đống Đa, Hà Nội\n";

    $headers = "From: noreply@rosesgarden.vn\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($to, $subject, $message, $headers);
}

/**
 * Send notification to admin
 */
function sendAdminNotification($orderData)
{
    $adminEmail = 'contact@rosesgarden.vn'; // Change to your admin email
    $subject = "Đơn hàng mới - #{$orderData['orderId']}";

    $productsList = '';
    foreach ($orderData['products'] as $product) {
        $subtotal = $product['price'] * $product['quantity'];
        $productsList .= "{$product['name']} x {$product['quantity']} = " . number_format($subtotal, 0, ',', '.') . "đ\n";
    }

    $message = "ĐƠN HÀNG MỚI CẦN XỬ LÝ\n";
    $message .= "=====================================\n";
    $message .= "Mã đơn hàng: {$orderData['orderId']}\n";
    $message .= "Khách hàng: {$orderData['name']}\n";
    $message .= "Email: {$orderData['email']}\n";
    $message .= "Điện thoại: {$orderData['phone']}\n";
    $message .= "Ngày giao: {$orderData['deliveryDate']} {$orderData['deliveryTime']}\n\n";
    $message .= "SẢN PHẨM:\n";
    $message .= $productsList . "\n";
    $message .= "Tổng tiền: " . number_format($orderData['totalPrice'], 0, ',', '.') . "đ\n";

    if (!empty($orderData['message'])) {
        $message .= "\nGhi chú: {$orderData['message']}\n";
    }

    $message .= "\nThông báo: Gửi email xác nhận đến khách hàng\n";

    $headers = "From: orders@rosesgarden.vn\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($adminEmail, $subject, $message, $headers);
}

?>