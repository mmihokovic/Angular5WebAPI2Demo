using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using SnowSoftwareExercise.Domain.Interfaces;
using SnowSoftwareExercise.Mappers;
using SnowSoftwareExercise.Models;

namespace SnowSoftwareExercise.Controllers
{
  [RoutePrefix("api/DataSample")]
  public class DataSampleController : ApiController
  {
    private readonly IDataSampleService _dataSampleService;
    public DataSampleController(IDataSampleService dataSampleService)
    {
      _dataSampleService = dataSampleService;
    }

    [HttpPost, Route("upload-data-sample")]
    public DataSampleModel UploadDataSample()
    {
      var response = new DataSampleModel();
      try
      {
        var httpRequest = HttpContext.Current.Request;
        if (httpRequest.Files.Count > 0)
        {
          foreach (string file in httpRequest.Files)
          {
            var postedFile = httpRequest.Files[file];
            if (postedFile == null)
            {
              response.AddError("Error while uploading a data sample file. Check the file and try again.");
              return response;
            }

            if (!postedFile.ContentType.Contains("text"))
            {
              response.AddError("Only text files are allowed.");
              return response;
            }
            var memory = new MemoryStream();
            postedFile.InputStream.CopyTo(memory);
            response = _dataSampleService.ParseDataFromFile(memory, postedFile.FileName).MapToDataSampleModel();
            response.AddSuccess("Data sample file uploaded successfully.");
          }
        }
        else
        {
          response.AddError("Error while uploading a data sample file. Check the file and try again.");
          return response;
        }

      }
      catch (Exception e)
      {
        response.AddError("Error while uploading a data sample file. Check the file and try again.");
      }

      return response;
    }

    [HttpPost, Route("update-data-sample")]
    public DataSampleModel UpdateBarData(DataSampleModel dataSampleModel)
    {
      var response = new DataSampleModel();
      try
      {
        var barData = dataSampleModel.MapToBarData();
            response = _dataSampleService.UpdateBarData(barData).MapToDataSampleModel();
            response.AddSuccess("Data sample file updates successfully.");
      }
      catch (Exception e)
      {
        response.AddError("Error while updating a data sample.");
      }

      return response;
    }
  }
}
