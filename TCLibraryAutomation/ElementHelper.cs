using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SE = SeleniumExtras.WaitHelpers;
using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using OpenQA.Selenium.Interactions;

namespace TCLibraryAutomation
{
    public static class ElementHelper
    {
        public static bool Click(IWebDriver driver, IWebElement element)
        {
            Console.WriteLine($"Clicking element at ({element.Location.X}, {element.Location.X}).");
            Console.WriteLine($"Clicking element {element.Text} {element.ToString()}.");
            Actions actionsBuilder = new Actions(driver);
            actionsBuilder.MoveToElement(element).Click().Build().Perform();

            return true;
        }

        public static IWebElement FindElement(IWebDriver driver, By by)
        {
            IWebElement foundElement = null;
            try
            {
                foundElement = driver.FindElement(by);
            }
            catch (NoSuchElementException)
            {
                Console.WriteLine($"Element with criteria {by.ToString()} not found.");
            }

            Assert.IsNotNull(foundElement, $"Element with criteria {by.ToString()} not found.");

            return foundElement;
        }

        public static IWebElement WaitUntilElementIsVisible(IWebDriver driver, string xPath)
        {
            return WaitUntilElementIsVisible(driver, By.XPath(xPath));
        }

        public static IWebElement WaitUntilElementIsVisible(IWebDriver driver, By by)
        {
            try
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(500))
                    .Until(SE.ExpectedConditions.ElementIsVisible(by));
            }
            catch (NoSuchElementException)
            {
                Console.WriteLine($"Element with xpath {by.ToString()} not found.");
                throw;
            }
            IWebElement element = driver.FindElement(by);
            return element;
        }

        public static IWebElement WaitUntilElementIsInVisible(IWebDriver driver, string xPath)
        {
            try
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(500))
                    .Until(SE.ExpectedConditions.InvisibilityOfElementLocated(By.XPath(xPath)));
            }
            catch (NoSuchElementException)
            {
                Console.WriteLine($"Element with xpath {xPath} not found.");
                throw;
            }
            IWebElement button = driver.FindElement(By.XPath(xPath));

            return button;
        }

        public static IWebElement WaitUntilElementIsClickable(IWebDriver driver, string xPath)
        {
            try
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(500))
                    .Until(SE.ExpectedConditions.ElementToBeClickable(By.XPath(xPath)));
            }
            catch (NoSuchElementException)
            {
                Console.WriteLine($"Element with xpath {xPath} not found.");
                throw;
            }
            IWebElement button = driver.FindElement(By.XPath(xPath));

            return button;
        }

        public static void ScrollTo(IJavaScriptExecutor javaScriptExecutor, int x = 0, int y = 0)
        {
            var js = String.Format("window.scrollTo({0}, {1})", x, y);
            javaScriptExecutor.ExecuteScript(js);
        }

        public static void ScrollToView(IWebDriver driver, IWebElement element)
        {
            if (element.Location.Y > 200)
            {
                ScrollTo(driver as IJavaScriptExecutor, 0, element.Location.Y - 100); // Make sure element is in the view but below the top navigation pane
            }
        }
    }
}
