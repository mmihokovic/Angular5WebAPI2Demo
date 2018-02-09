using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SnowSoftwareExercise.Domain.Models
{
  public class BarData
  {
    public string Name { get; set; }
    public string Color { get; set; }
    public decimal Value { get; set; }

    public BarData()
    {
      
    }

    public BarData(string name, string color, decimal value)
    {
      Name = name;
      Color = color;
      Value = value;
    }
  }
}
