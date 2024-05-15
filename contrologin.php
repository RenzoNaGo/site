<?php

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "id21855511_ecoriego";

// Crear conexión
$conexion = new mysqli($servername, $username, $password, $dbname);
$conexion->set_charset("utf8");

// Obtener los datos enviados por el método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST["username"];
    $pass = $_POST["password"];

    $sql = $conexion->query("SELECT * FROM usuario WHERE user = '$user' AND pass = '$pass'");
    if ($datos = $sql->fetch_object()) {
        session_start();
        // Suponiendo que $idUsuario contiene el ID del usuario después de la autenticación
        $_SESSION['iduser'] = $datos->id_user;
        // Redirigir a la página deseada después de iniciar sesión
        header("Location: Pprincipal.php");
        exit; // Importante: asegúrate de salir del script después de la redirección
    } else {
        // Redirigir a la página de inicio de sesión y mostrar la alerta
        header("Location: Plogin.php?error=credenciales_incorrectas");
        exit; // Importante: asegúrate de salir del script después de la redirección
    }
}
?>