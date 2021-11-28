package com.example.buttonnav

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        var regButton : Button = findViewById(R.id.regButton)
        var confirmButton : Button = findViewById(R.id.LoginConfirm)
        regButton.setOnClickListener(){
            val intent = Intent(this,RegistrationActivity::class.java)
            startActivity(intent)
        }
//        здесь будут запросы к серверу, для получения логина и пароля из бд
//        потом идет их сравнение
        confirmButton.setOnClickListener(){
            val intent = Intent(this,MainActivity::class.java)
            startActivity(intent)
        }


    }

}