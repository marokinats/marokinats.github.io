<?php 

header('Content-Type: application/json'); //Заголовок запроса

$login = $_POST['login'];
$pwd = $_POST['password']:
//$house = $_POST['adress-house'];

//echo $name;
$message = "Сообщение от пользователя: $login";

//$result Возвращает true, если соообщение отправилось, false - если не отправилось
if ($name == '') {
	$result == false;
} elseif ($pwd == '') {
	$result == false;
} else {
	$result = mail('pink_panter1985@mail.ru', 'Тема письма', $message);
};



echo json_encode(array(
	'status' => $result
));

?>