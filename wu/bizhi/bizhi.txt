<?php
$images = array("http://192.168.31.2:6086/tvbox-wu/wu/bizhi/1.jpg", "http://192.168.31.2:6086/tvbox-wu/wu/bizhi/2.jpg", "http://192.168.31.2:6086/tvbox-wu/wu/bizhi/3.jpg", "http://192.168.31.2:6086/tvbox-wu/wu/bizhi/4.jpg");
shuffle($images);
?>

<img src="<?php echo array_pop($images); ?>" alt="Random Image">
