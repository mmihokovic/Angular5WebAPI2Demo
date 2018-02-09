using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SnowSoftwareExercise.Domain.Models;
using SnowSoftwareExercise.Models;

namespace SnowSoftwareExercise.Mappers
{
  public static class DataSampleMapper
  {
    public static DataSampleModel MapToDataSampleModel(this List<BarData> barData)
    {
      return new DataSampleModel
      {
        BarDataModels = barData?.Select(MapToBarDataModel).ToList()
      };
    }

    public static List<BarData> MapToBarData(this DataSampleModel dataSampleModel)
    {
      return dataSampleModel.BarDataModels.Select(MapToBarData).ToList();
    }

    public static BarData MapToBarData(this BarDataModel barDataModel)
    {
      return new BarData
      {
        Name = barDataModel.Name,
        Color = barDataModel.Color,
        Value = barDataModel.Value
      };
    }

    public static BarDataModel MapToBarDataModel(this BarData barData)
    {
      return new BarDataModel
      {
        Name = barData.Name,
        Color = barData.Color,
        Value = barData.Value
      };
    }
  }
}
