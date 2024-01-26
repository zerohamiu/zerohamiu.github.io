<?php
ob_start();
class DATABASE
{
    private $host = 'localhost';
    private $dbname = 'asm';
    private $username = 'root';
    private $password = '';
    private $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
    private $DBH="";
    public $bcrypt_key = 'H@xpubg';
    function __construct()
    {
            //tao doi tuong thuoc lop PDO
        $this->DBH = new PDO('mysql:host='.$this->host.';dbname='.$this->dbname,$this->username, $this->password,$this->options);
    }
        /*
        ** PDO_QUERY
            - Chức năng: Get List ALL có điều kiện
            - Câu lệnh sử dụng : SELECT * FROM 
        */
            function pdo_query($sql){
             $sql_args = array_slice(func_get_args(), 1);

             try{
               $this->__construct();
               $stmt = $this->DBH->prepare($sql);
               $stmt->execute($sql_args);
               $rows = $stmt->fetchAll();
               return $rows;
           }
           catch(PDOException $e){
            throw $e;
        }
        finally{
            unset( $this->DBH );
        }
    }
   /*
        ** PDO_EXECUTE
            - Chức năng: Thực hiện truy vấn câu lệnh
            - Câu lệnh sử dụng : INSERT, UPDATE, DELETE,..
        */
            function pdo_execute($sql){
                $sql_args = array_slice(func_get_args(), 1);

                try{
                   $this->__construct();
                   $stmt = $this->DBH->prepare($sql);
                   $stmt->execute($sql_args);

               }
               catch(PDOException $e){
                throw $e;
            }
            finally{
                unset( $this->DBH );
            }
        }
 /*
        ** PDO_QUERY_ONE
            - Chức năng: Truy vấn 1 bản ghi
            - Câu lệnh sử dụng : SELECT * FROM (CÓ ĐIỀU KIỆN)
        */
            function pdo_query_one($sql){
             $sql_args = array_slice(func_get_args(), 1);

             try{
               $this->__construct();
               $stmt = $this->DBH->prepare($sql);
               $stmt->execute($sql_args);
               $rows = $stmt->fetch(PDO::FETCH_ASSOC);
               return $rows;
           }
           catch(PDOException $e){
            throw $e;
        }
        finally{
            unset( $this->DBH );
        }
    }
 /*
        ** PDO_QUERY_ONE
            - Chức năng: Truy vấn giá trị 1 bản ghi
            - Câu lệnh sử dụng : COUNT, SUM, AVENGER
        */
            function pdo_query_values($sql){
             $sql_args = array_slice(func_get_args(), 1);

             try{
               $this->__construct();
               $stmt = $this->DBH->prepare($sql);
               $stmt->execute($sql_args);
               $rows = $stmt->fetch(PDO::FETCH_ASSOC);
               return array_values($rows)[0];

           }
           catch(PDOException $e){
            throw $e;
        }
        finally{
            unset( $this->DBH );
        }
    }
}
?>