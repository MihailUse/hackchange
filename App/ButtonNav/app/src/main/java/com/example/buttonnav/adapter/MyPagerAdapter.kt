package com.example.buttonnav.adapter

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.example.buttonnav.FirstFragment
import com.example.buttonnav.SecondFragment
import com.example.buttonnav.ThirdFragment

class MyPagerAdapter(fragmentManager: FragmentManager, lifecycle: Lifecycle) : FragmentStateAdapter(fragmentManager,lifecycle) {


    override fun getItemCount(): Int {
        return 3
    }

    override fun createFragment(position: Int): Fragment {
        return when (position) {
            0 -> {
                FirstFragment()
            }
            1 -> {
                SecondFragment()

            }
            2 -> {
                return ThirdFragment()
            }
            else -> {
                Fragment()
            }
        }
    }
}