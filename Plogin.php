<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión</title>
  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <!-- Estilos personalizados -->
  <style>
    body {
      background: #044B3B;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #78D6F0, #044B3B);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #78D6F0, #044B3B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .login-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 40px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fff;
      margin-top: 80px;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
      align-items: center;
      text-align: center;
    }
    .login-container h2 {
      margin-bottom: 30px;
      text-align: center;
      align-items: center;
    }
    .form-group {
      margin-bottom: 30px;
      align-items: center;
      text-align: center;
    }
    .form-group label {
      font-weight: bold;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }
    .btn-login {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
    }
    .btn-login:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <!-- jQuery y Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <?php
  // Verificar si hay un error de credenciales incorrectas
  if (isset($_GET['error']) && $_GET['error'] == 'credenciales_incorrectas') {
      echo "<script language='JavaScript'>alert('Credenciales incorrectas');</script>";
  }
  ?>
  <div class="container">
    <div class="login-container">
      <div class="form-group">
        <img src="recursos/ECORIEGO.jpg" style="max-width: 250px; margin-left: -50px;">
      </div>
      <form method="post" action="contrologin.php" enctype="multipart/form-data">
        <div class="form-group">
          <input type="text" id="username" name="username" class="form-control" Placeholder="Usuario" required>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" class="form-control" Placeholder="Contraseña" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-login" id="btnlog" name="btnlog" style="background: #014E3C;">Iniciar Sesión</button>
        </div>
        <a href="Prusuario.php" style="margin-top: 20px;">Registrarse</a>
      </form>
    </div>
  </div>
</body>
</html>
