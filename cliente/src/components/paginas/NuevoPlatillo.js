import React,{useContext,useState} from "react"
import { useFormik } from "formik"
import  * as Yup from 'yup'
import {FirebaseContext} from '../../firebase'
import {useNavigate} from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'

const NuevoPlatillo = () => {

  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [url, setUrl] = useState('')


  //contex con operaciones de firebase formulario

  const {firebase} = useContext(FirebaseContext)
  //console.log(firebase)

  //hook para redireccionar

  const navigate = useNavigate()

  //Manejadores de imagenes

  const handleUploadStart =()=>{
    setProgreso(0)
    setSubiendo(true)


  }
  const handleUploadError =error=>{
    setSubiendo(false)
    console.log(error)
  }
  const handleUploadSuccess = async  nombre=>{
    setProgreso(100)
    setSubiendo(false)
    const url = await firebase.storage.ref('productos').child(nombre).getDownloadURL()
    console.log(url)
    setUrl(url)

  }
  const handleProgress =progreso=>{
    setProgreso(progreso)
    console.log(progreso)
  }


  //validar y leer datos de formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
      imagen: ""
    },
    validationSchema:Yup.object({
      nombre:Yup.string().min(3,'mínimo 3 caracteres').required('Nombre Obligatorio'),
      precio:Yup.number().min(1,'Se debe agregar precio').required('Nombre Obligatorio'),
      descripcion:Yup.string().min(3,'mínimo 3 caracteres').required('Descripcion es Obligatoria'),
      categoria:Yup.string().min(3,'mínimo 3 caracteres').required('Se debe seleccionar una categoria'),
    }),
    onSubmit:datos=>{
      //console.log(datos)
      try {
        datos.existencia = true
        datos.imagen = url
        firebase.db.collection('productos').add(datos)
        //redireccionar
        navigate('/menu')
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Nuevo Platillo</h1>
      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl p-6'>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='nombre'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                nombre
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:our focus:shadow-outline'
                placeholder=' Nombre del platillo'
                id='nombre'
                type='text'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre && formik.errors.nombre ? (<div className="bg-red-100 border-red-500 border-l-4 p-2" role="alert">
                <p className="p-4 text-red-900 text-sm">{formik.errors.nombre}</p>
              </div>): null}
            </div>

            <div className='mb-4'>
              <label
                htmlFor='precio'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                precio
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:our focus:shadow-outline'
                placeholder=' Precio del platillo'
                id='precio'
                type='number'
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
                {formik.touched.precio && formik.errors.precio ? (<div className="bg-red-100 border-red-500 border-l-4 p-2">
                <p className="p-4 text-red-900 text-sm">{formik.errors.precio}</p>
              </div>):null}
            </div>

            <div className='mb-4'>
              <label
                htmlFor='descripcion'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                descripcion
              </label>
              <textarea
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder=' descripcion del platillo'
                id='descripcion'
                type='text'
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
                {formik.touched.descripcion && formik.errors.descripcion ? (<div className="bg-red-100 border-red-500 border-l-4 p-2">
                <p className="p-4 text-red-900 text-sm">{formik.errors.descripcion}</p>
              </div>):null}
            </div>

            <select
              name='categoria'
              id='categoria'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
              value={formik.values.categoria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            >
              <option value=''>--seleccione--</option>
              <option value='desayuno'>desayunos</option>
              <option value='almuerzo'>almuerzos</option>
              <option value='cena'>cenas</option>
              <option value='postre'>postres</option>
              <option value='ensalada'>ensaladas</option>
              <option value='aperitivo'>aperitivos</option>
              <option value='bebida'>bebidas</option>
            </select>
            {formik.touched.categoria && formik.errors.categoria ? (<div className="bg-red-100 border-red-500 border-l-4 p-2">
                <p className="p-4 text-red-900 text-sm">{formik.errors.categoria}</p>
              </div>):null}
            <div className='mb-4'>
              <label
                htmlFor='imagen'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                imagen
              </label>
              <FileUploader
              accept='image/*'
              id='imagen'
              name='imagen'
              randomizeFilename
              storageRef = {firebase.storage.ref('productos')}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress ={handleProgress}
              />
              {subiendo && (
                <div className="h-12 relative w-full border">
                  <div style={{width:`${progreso}%`}} className="bg-green-500 absolute left-0 h-12 w-12 text-white px-2 flex items-center">{progreso}%</div>
                </div>
              )}

              {url && (
                <p className="bg-green-500 text-white p-3 my-3 ">Imagen se subió correctamente</p>
              )}

                {formik.touched.imagen && formik.errors.imagen ? (<div className="bg-red-100 border-red-500 border-l-4 p-2">
                <p className="p-4 text-red-900 text-sm">{formik.errors.imagen}</p>
              </div>):null}
            </div>
            <input
              type='submit'
              className='bg-gray-700 hover:bg-gray-800 text-white w-full mt-5 p-2 uppercase font-bold hover: text-yellow-500-900'
              value='agregar platillo'
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default NuevoPlatillo
