using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SnowSoftwareExercise.Domain.Models;

namespace SnowSoftwareExercise.Domain.Interfaces
{
  public interface IDataSampleService
  {
    List<BarData> ParseDataFromFile(MemoryStream memory, string postedFileFileName);
    List<BarData> UpdateBarData(List<BarData> barData);
  }
}
