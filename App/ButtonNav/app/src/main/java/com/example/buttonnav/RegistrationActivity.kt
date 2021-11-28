package com.example.buttonnav


import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import android.widget.Toast.LENGTH_SHORT
import androidx.appcompat.app.ActionBar

class RegistrationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {




        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_registration_activity)

//инициализируем переменные
        val Login = findViewById<EditText>(R.id.editTextLogin).text
        val Password = findViewById<EditText>(R.id.editTextPassword).text
        val PasswordConfirm = findViewById<EditText>(R.id.editTextConfirmPassword).text
        val email = findViewById<EditText>(R.id.editTextEmail).text
        val toLoginButton = findViewById<Button>(R.id.toLogin)
        val button = findViewById<Button>(R.id.RegistrationConfirm)
//по нажатию на кнопку открывается экран логина
        toLoginButton.setOnClickListener() {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        button.setOnClickListener() {
            //                    если пароли не пустые
            if (Password.isEmpty() !=null || PasswordConfirm.isEmpty() !=null) {
                //                    если логин не пустая
                if (Login.isNotEmpty())
                {
//                    если почта не пустая
                    if (email.isNotEmpty()){
//                        пароли больше 3 символов
                        if (Password.length > 3 ||PasswordConfirm.length > 3 )
                        {
                            //                                проверка на почту
                            if (email.indexOfAny(charArrayOf('@','.')) > 0)
                            {
                                Toast.makeText(this, "Все гуд", Toast.LENGTH_SHORT).show()
                                val intent = Intent(this,LoginActivity::class.java)
                                startActivity(intent)
//                                проверка на одинаковые пароли
//                                if (Password.equals(PasswordConfirm) == true){
//                                    Toast.makeText(this, "Все гуд", Toast.LENGTH_SHORT).show()
//                                }else{
//                                    Toast.makeText(this, "Пароли не одинаковые", Toast.LENGTH_SHORT).show()
//                                }
                            }else{
                                Toast.makeText(this, "Не правильная почта", Toast.LENGTH_SHORT).show()
                            }
                        }
                        else{
                            Toast.makeText(this, "Короткий пароль", Toast.LENGTH_SHORT).show()
                        }
                    }else{
                        Toast.makeText(this, "Напишите почту", Toast.LENGTH_SHORT).show()
                    }
                }else{
                    Toast.makeText(this, "Напишите логин", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(this, "Напишите пароль", Toast.LENGTH_SHORT).show()
            }

        }


    }



}