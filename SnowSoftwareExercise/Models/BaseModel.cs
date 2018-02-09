using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SnowSoftwareExercise.Models
{
  public class BaseModel
  {
    public List<string> Success { get; set; }
    public List<string> Errors { get; set; }

    public BaseModel()
    {
      Success = new List<string>();
      Errors = new List<string>();
    }

    public void AddError(string error)
    {
      Errors.Add(error);
    }

    public void AddSuccess(string success)
    {
      Success.Add(success);
    }
  }
}
