using System;
using System.ComponentModel.DataAnnotations;

namespace <%= safeName %>.Server.Models
{
    public class ToDo
    {
        [Key]
        public int _id { get; set; }
        public string toDo { get; set; }
        public bool complete { get; set; }
        public DateTime createDate { get; set; }
    }

}
