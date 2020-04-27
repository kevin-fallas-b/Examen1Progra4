<?php

	class Conexion
	{
		private $servidor;
		private $usuario;
		private $clave;
		private $base_datos;
		private $conexion;
		private $resultado;
		private static $_instance; //Instancia única

		function __construct()
		{
			$this->servidor = "localhost";
			$this->usuario = "root";
			$this->clave = "";
			$this->base_datos = "bd_productos";
			$this->conectar_base_datos();
		}

		public static function getInstance() {
			if(!self::$_instance) { // Si no hay una instancia se crea una
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		// Método clonado que previene la creación de múltiples instancias (SINGLETON)
		private function __clone() { }

		private function conectar_base_datos()
		{
			$this->conexion = mysqli_connect($this->servidor,$this->usuario,$this->clave);
			mysqli_select_db($this->conexion, $this->base_datos) or die (mysqli_error($this->conexion));
            mysqli_query ($this->conexion, "SET NAMES 'utf8'");

            return $this->conexion;
		}

		public function consulta($consulta)
		{
			return $this->resultado = mysqli_query($this->conexion, $consulta) or die (mysqli_error($this->conexion));
		}

		public function extraer_registro ()
		{
			if ($fila = mysqli_fetch_row($this->resultado)){
				return $fila;
			} else {
				return false;
			}

			echo mysqli_error($this->conexion);
		}
	}
?>



