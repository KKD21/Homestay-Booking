import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createProperty } from "../../services/supabase/properties";
import toast, { Toaster } from "react-hot-toast";
import { useThemeProvider } from "../../utils/ThemeContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

function AddProperty() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationKey: ["properties"],
    mutationFn: async (data) => {
      // Handle file uploads safely
      const thumbnailFile = data.thumbnail && data.thumbnail.length > 0 ? data.thumbnail[0] : null;
      const imageFiles = data.images && data.images.length > 0 ? Array.from(data.images) : [];
      
      return await createProperty(data, thumbnailFile, imageFiles);
    },
    onSuccess: () => {
      reset();
      toast.success("Property has been created successfully!");
      navigate("/properties");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitForm(data) {
    console.log(data);
    mutate(data);
  }
  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">New Property</h1>
      <form action="" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("name", { maxLength: 100, minLength: "3", required: true })}
            />
            {errors.name?.type === "minLength" && (
              <p className="text-sm text-red-700 italic">Name must contain at least 3 characters</p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className="text-sm text-red-700 italic">Name cannot exceed 64 characters</p>
            )}
            {errors.name?.type === "required" && <p className="text-sm text-red-700 italic">Name is required</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Thumbnail (Optional)
            </label>
            <input
              {...register("thumbnail", { required: false })}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-600 file:text-white hover:file:bg-slate-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-slate-500 dark:hover:file:bg-slate-400 cursor-pointer file:cursor-pointer border dark:border-slate-800 dark:bg-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div className="md:flex gap-5 mt-5">
          <div className="flex flex-col gap-2 grow">
            <label htmlFor="" className="font-semibold">
              Property Type
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("property_type", { required: true })}
            >
              <option value="">Select Property Type</option>
              <option value="Campsite">Campsite</option>
              <option value="Cruise">Cruise</option>
              <option value="Guesthouse">Guesthouse</option>
              <option value="Homestay">Homestay</option>
              <option value="Hotel">Hotel</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Resort">Resort</option>
              <option value="Villa">Villa</option>
            </select>
            {errors.property_type?.type === "required" && (
              <p className="text-sm text-red-700 italic">Property type is required</p>
            )}
          </div>
          <div className="flex flex-col gap-2 grow">
            <label htmlFor="" className="font-semibold">
              Status
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("status", { required: true })}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Address
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("address", { required: true })}
            />
            {errors.address?.type === "required" && (
              <p className="text-sm text-red-700 italic">Address is required</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              City
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("city", { required: true })}
            />
            {errors.city?.type === "required" && (
              <p className="text-sm text-red-700 italic">City is required</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              State
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("state", { required: false })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Pincode
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("pincode", { required: false })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              BHK (Bedroom, Hall, Kitchen)
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("bhk", { required: true })}
            >
              <option value="">Select BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5 BHK</option>
              <option value="5+">5+ BHK</option>
            </select>
            {errors.bhk?.type === "required" && (
              <p className="text-sm text-red-700 italic">BHK is required</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="font-semibold">
            Description
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows="4"
            {...register("description", { required: false })}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="font-semibold">
            Landmark (Optional)
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("landmark", { required: false })}
          />
        </div>

        <div className="mt-5">
          <h2 className="font-semibold text-lg mb-3">Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Essentials */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Essentials
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.wifi" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.wifi")} />
                  <label htmlFor="amenities.wifi" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">WiFi</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.ac" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.ac")} />
                  <label htmlFor="amenities.ac" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Air conditioning</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.heating" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.heating")} />
                  <label htmlFor="amenities.heating" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Heating</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.tv" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.tv")} />
                  <label htmlFor="amenities.tv" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">TV</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.washer" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.washer")} />
                  <label htmlFor="amenities.washer" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Washer</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.dryer" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.dryer")} />
                  <label htmlFor="amenities.dryer" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dryer</label>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Features
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.pool" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.swimming_pool")} />
                  <label htmlFor="amenities.pool" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Swimming pool</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.hot_tub" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.hot_tub")} />
                  <label htmlFor="amenities.hot_tub" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hot tub</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.balcony" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.balcony")} />
                  <label htmlFor="amenities.balcony" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Balcony</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.garden" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.garden")} />
                  <label htmlFor="amenities.garden" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Garden</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.gym" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.gym")} />
                  <label htmlFor="amenities.gym" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gym</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.elevator" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.elevator")} />
                  <label htmlFor="amenities.elevator" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Elevator</label>
                </div>
              </div>
            </div>

            {/* Kitchen & Dining */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Kitchen & Dining
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.kitchen" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.kitchen")} />
                  <label htmlFor="amenities.kitchen" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kitchen</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.refrigerator" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.refrigerator")} />
                  <label htmlFor="amenities.refrigerator" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Refrigerator</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.microwave" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.microwave")} />
                  <label htmlFor="amenities.microwave" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Microwave</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.dining" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.dining")} />
                  <label htmlFor="amenities.dining" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Dining area</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.gas_stove" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.gas_stove")} />
                  <label htmlFor="amenities.gas_stove" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gas stove</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.coffee_maker" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.coffee_maker")} />
                  <label htmlFor="amenities.coffee_maker" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Coffee maker</label>
                </div>
              </div>
            </div>

            {/* Parking & Facilities */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Parking & Facilities
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.parking" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.parking")} />
                  <label htmlFor="amenities.parking" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Free parking</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.ev_charger" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.ev_charger")} />
                  <label htmlFor="amenities.ev_charger" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">EV charger</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.play_area" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.play_area")} />
                  <label htmlFor="amenities.play_area" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Play area</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.power_backup" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.power_backup")} />
                  <label htmlFor="amenities.power_backup" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Power backup</label>
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Safety
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.security" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.security")} />
                  <label htmlFor="amenities.security" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Security</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.cctv" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.cctv")} />
                  <label htmlFor="amenities.cctv" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">CCTV</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.fire_extinguisher" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.fire_extinguisher")} />
                  <label htmlFor="amenities.fire_extinguisher" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fire extinguisher</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.first_aid" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.first_aid")} />
                  <label htmlFor="amenities.first_aid" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">First aid kit</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.smoke_alarm" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.smoke_alarm")} />
                  <label htmlFor="amenities.smoke_alarm" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Smoke alarm</label>
                </div>
              </div>
            </div>

            {/* Bathroom */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                Bathroom
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.geyser" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.geyser")} />
                  <label htmlFor="amenities.geyser" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Geyser/Hot water</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.hair_dryer" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.hair_dryer")} />
                  <label htmlFor="amenities.hair_dryer" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hair dryer</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="amenities.toiletries" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" {...register("amenities.toiletries")} />
                  <label htmlFor="amenities.toiletries" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Toiletries</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="font-semibold">
            Images (Optional)
          </label>
          <input
            {...register("images", { required: false })}
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-600 file:text-white hover:file:bg-slate-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-slate-500 dark:hover:file:bg-slate-400 cursor-pointer file:cursor-pointer border dark:border-slate-800 dark:bg-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={isPending}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            {isPending ? <LoadingSpinner /> : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProperty;