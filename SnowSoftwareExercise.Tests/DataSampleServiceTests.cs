using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SnowSoftwareExercise.Domain.Implementation;
using SnowSoftwareExercise.Domain.Models;

namespace SnowSoftwareExercise.Tests
{
  [TestClass]
  public class DataSampleServiceTests
  {
    [TestMethod]
    public void ParseDataFromFileTest()
    {
      var dataSampleService = new DataSampleService();
      var memory = new MemoryStream(Encoding.UTF8.GetBytes("#A:RED:5\n#B:BLUE:10\n#C:GREEN:15" ?? ""));
      var data = dataSampleService.ParseDataFromFile(memory, "filename");

      Assert.AreEqual(3, data.Count);
      Assert.AreEqual("A", data.First().Name);
      Assert.AreEqual("RED", data.First().Color);
      Assert.AreEqual(5, data.First().Value);
      Assert.AreEqual("C", data.Last().Name);
      Assert.AreEqual("GREEN", data.Last().Color);
      Assert.AreEqual(15, data.Last().Value);
    }

    [TestMethod]
    public void UpdateBarDataTest()
    {
      var dataSample = new List<BarData>();
      dataSample.Add(new BarData
      {
        Name = "A",
        Color = "RED",
        Value = -1
      });
      dataSample.Add(new BarData
      {
        Name = "B",
        Color = "GREEN",
        Value = -1
      });
      var dataSampleService = new DataSampleService();
      var result = dataSampleService.UpdateBarData(dataSample);
      Assert.AreEqual(2, result.Count);
      Assert.AreNotEqual(-1, result.First().Value);
      Assert.AreNotEqual(-1, result.Last().Value);
    }
  }
}
