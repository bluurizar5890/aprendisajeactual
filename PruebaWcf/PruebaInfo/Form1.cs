﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace PruebaInfo
{
    public partial class Form1 : Form
    {
        public string resultado { get; set; }
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            resultado = txtData.Text;
            //MessageBox.Show("MENSAJE DE PRUEBA");
        }
    }
}
