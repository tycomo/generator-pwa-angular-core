using System;
using System.ComponentModel.DataAnnotations;

namespace <%= safeName %>.Server.Models
{
    public class Person
    {
        [Key]
        public int _id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime birthday { get; set; }
        public string homeTown { get; set; }
    }

}
