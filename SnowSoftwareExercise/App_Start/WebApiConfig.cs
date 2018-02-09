using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace SnowSoftwareExercise
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services

      var json = config.Formatters.JsonFormatter;
      json.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;

      // Web API routes


      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
        "WithActionApi",
        "api/{controller}/{action}/{id}",
        defaults: new { id = RouteParameter.Optional }
      );

      config.Routes.MapHttpRoute(
        name: "DefaultApi",
        routeTemplate: "api/{controller}/{id}",
        defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
