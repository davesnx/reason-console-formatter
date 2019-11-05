let list = [1; 2; 3] ;;

let tuple = (4, 5) ;;

let array = [| 1; 2; 3 |] ;;

type variant = OCaml | StandardML ;;
let lang = OCaml ;;

(* # type host_info =
    { hostname   : string;
      os_name    : string;
      cpu_arch   : string;
      timestamp  : Time.t;
    };;
*)

(* val record : host_info =
  { hostname = "flick.local";
    os_name = "Darwin";
    cpu_arch = "i386";
    timestamp = 2013-11-05 08:49:38.850439-05:00
  } ;; *)
