using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SnowSoftwareExercise.Models
{
  public class BarDataModel : BaseModel
  {
    public string Name { get; set; }
    public string Color { get; set; }
    public decimal Value { get; set; }
  }
}
