<?php
//Config
$config = array(
  // 'to'		=> 'help.bluewhale@gmail.com',
	'to'		=> 'paul.voloschuk@gmail.com',
	'subject'	=> 'Новое сообщение с сайта "Синий кит"',
	'headers'	=> 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=iso-8859-1' . "\r\n" . 'From: "Синий Кит" <info@xscenter.org>' . "\r\n"
);
//Receive data from POST
$data = array(
	'name' 		=> $_POST['name'] ?: '',
	'сontacts'		=> $_POST['сontacts'] ?: '',
	'text' 	=> $_POST['text'] ?: ''
);
//Create message
$message = '
<html>
	<head>
		<title>Новое сообщение с сайта "Синий кит"</title>
	</head>
	<body>
		<h2>' . ucfirst($data['name']) . ' отправил(а) вам сообщение</h2>
		<h3>Контактные данные:</h3>
		<p>Имя: ' . ucfirst($data['name']) . '</p>
		<p>Контакты: ' . $data['сontacts'] . '</p>
		<h3>Сообщение:</h3>
		<p>' . $data['text'] . '</p>
	</body>
</html>
';
//Sending mail
if (mail($config['to'], $config['subject'], $message, $config['headers'])) {
	http_response_code(200);
} else {
	http_response_code(500);
}
