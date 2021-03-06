﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibraryApplication.Controllers;
using LibraryApplication.Data;
using LibraryApplication.Model;

namespace LibraryApplication.Tests
{
    [TestFixture]
    public class PublicControllerTest
    {
        private readonly PublicController publicController;
        private LibraryDataContext libraryDataContext;
        public PublicControllerTest()
        {

            initContext();
            // Init the controller
            publicController = new PublicController(libraryDataContext);
        }

        private void initContext()
        {
            string path = (Directory.GetCurrentDirectory()) + "\\LibraryApplication.sqlite";
            var connection = "Data Source=" + path;
            var builder = new DbContextOptionsBuilder<LibraryDataContext>()
            .UseSqlite(connection);
            var context = new LibraryDataContext(builder.Options);
            libraryDataContext = context;
        }

        [Test]
        public void ReturnAllAvailableBooks()
        {
            IQueryable result = publicController.bookDetails();

            List<Book> books = result as List<Book>;
        }
    }
}
