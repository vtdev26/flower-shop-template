<?php
/**
 * Order Form Handler - Rose's Garden
 * Processes flower orders and sends confirmation emails
 * 
 * Requires the "PHP Email Form" library
 * The "PHP Email Form" library is available only in the pro version of the template
 * The library should be uploaded to: vendor/php-email-form/php-email-form.php
 * For more info and help: https://bootstrapmade.com/php-email-form/
 */

// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'giacatdu1101@gmail.com';

if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$order_form = new PHP_Email_Form;
$order_form->ajax = true;

$order_form->to = $receiving_email_address;
$order_form->from_name = $_POST['name'];
$order_form->from_email = $_POST['email'];
$order_form->subject = "Đơn hàng mới từ Rose's Garden - Order Confirmation";

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
$order_form->smtp = array(
  'host' => 'example.com',
  'username' => 'example',
  'password' => 'pass',
  'port' => '587'
);
*/

$order_form->add_message($_POST['name'], 'Tên khách hàng / Name');
$order_form->add_message($_POST['email'], 'Email');
$order_form->add_message($_POST['phone'], 'Điện thoại / Phone', 4);
$order_form->add_message($_POST['date'], 'Ngày giao hàng / Delivery Date', 4);
$order_form->add_message($_POST['time'], 'Giờ giao hàng / Delivery Time', 4);
$order_form->add_message($_POST['people'], 'Số lượng sản phẩm / Quantity', 1);
$order_form->add_message($_POST['message'], 'Ghi chú / Notes');

echo $order_form->send();
?>