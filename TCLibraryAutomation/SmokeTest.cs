using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Text;

namespace TCLibraryAutomation
{
    [TestFixture]
    public class SmokeTest
    {
        private IWebDriver m_driver;

        [OneTimeSetUp]
        public void SetUp()
        {
            m_driver = new ChromeDriver();
            m_driver.Manage().Window.Maximize();
        }

        [Test]
        public void LoginTest()
        {
            m_driver.Url = "https://tclibrary.azurewebsites.net/";            

            IWebElement usernameField = ElementHelper.WaitUntilElementIsVisible(m_driver, By.Id("email"));
            IWebElement passwordField = m_driver.FindElement(By.Id("password"));
            IWebElement loginButton = m_driver.FindElement(By.Id("login-btn"));

            usernameField.SendKeys("prashants@touchcoresystems.com");
            passwordField.SendKeys("Touchcore123");
            ElementHelper.Click(m_driver, loginButton);

            System.Threading.Thread.Sleep(5000);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            m_driver.Close();
            m_driver.Dispose();
        }
    }
}
