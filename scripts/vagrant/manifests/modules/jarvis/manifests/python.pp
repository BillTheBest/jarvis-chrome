class jarvis::python {

  include jarvis::python::prereqs,
    jarvis::python::virtualenv

  Class['jarvis::python::prereqs'] ->
    Class['jarvis::python::virtualenv']

}
