using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SnowSoftwareExercise.Domain.Interfaces;
using SnowSoftwareExercise.Domain.Models;

namespace SnowSoftwareExercise.Domain.Implementation
{
  public class DataSampleService : IDataSampleService
  {
    public List<BarData> ParseDataFromFile(MemoryStream memory, string postedFileFileName)
    {
      var lines = readAllLinesFromFile(memory);
      var chartData = new List<BarData>();
      foreach (var line in lines)
      {
        // skip empty lines
        if (String.IsNullOrWhiteSpace(line))
        {
          continue;
        }
        chartData.Add(parseBarInfo(line));
      }
      return chartData;
    }

    private List<string> readAllLinesFromFile(MemoryStream memory)
    {
      memory.Position = 0;
      var lines = new List<string>();
      var textReader = new StreamReader(memory);
      string line;
      while((line = textReader.ReadLine()) != null)
      {
        lines.Add(line);
      }
      return lines;
    }

    private BarData parseBarInfo(string line)
    {
      var splited = line.Split(':');
      var barName = splited[0].Replace("#", String.Empty);
      var barColor = splited[1];
      var barValue = Decimal.Parse(splited[2]);
      return new BarData(barName, barColor, barValue);
    }

    public List<BarData> UpdateBarData(List<BarData> barData)
    {
      var rnd = new Random();
      barData.ForEach(b => b.Value = rnd.Next(100));
      return barData;
    }
  }
}
