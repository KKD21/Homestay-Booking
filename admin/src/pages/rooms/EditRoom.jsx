import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoomById, updateRoom } from "../../services/supabase/rooms";
import { getAllProperties } from "../../services/supabase/properties";
import toast, { Toaster } from "react-hot-toast";
import { useThemeProvider } from "../../utils/ThemeContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";

function EditRoom() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();
  const navigate = useNavigate();
  const { id } = useParams();
  const query = useQueryClient();
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch room data
  const { data: room, isLoading: isLoadingRoom } = useQuery({
    queryKey: ["roomsEdit", id],
    queryFn: async () => await getRoomById(id),
    staleTime: 60 * 60,
  });

  // Fetch properties for the dropdown
  const { data: propertiesData, isLoading: isLoadingProperties } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => await getAllProperties(),
    staleTime: 60 * 60,
  });

  // Set form values when room data is loaded
  useEffect(() => {
    if (room) {
      setValue("name", room.name);
      setValue("status", room.status || "available");
      setValue("capacity", room.capacity || 1);
      setValue("price", room.price || 500);
      setValue("discount", room.discount || 0);
      setValue("sleeps", room.sleeps || 1);
      setValue("property_id", room.property_id || "");
      setValue("bed_type", room.bed_type || "");
      setValue("bed_count", room.bed_count || 1);
      setValue("room_type", room.room_type || "");
      
      // Removed setting amenities as they're managed at the property level
    }
  }, [room, setValue]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["rooms"],
    mutationFn: async (data) => {
      if (!id) throw new Error("Room ID is required");
      
      // No need to handle file uploads as they're managed at the property level
      return await updateRoom(parseInt(id), data);
    },
    onSuccess: () => {
      query.invalidateQueries(["rooms"]);
      query.invalidateQueries(["roomsEdit"]);
      toast.success("Room has been updated successfully!");
      navigate("/rooms");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitForm(data) {
    console.log(data);
    mutate(data);
  }

  if (isLoadingRoom || isLoadingProperties) return <LoadingSpinner />;

  if (!room) return <h1>No room was found</h1>;

  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-7">Edit Room</h1>
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

          {/* Thumbnail field removed as it's redundant with property thumbnail */}
        </div>

        {/* Property Selection */}
        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="" className="font-semibold">
            Property
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("property_id", { required: true })}
          >
            <option value="">Select Property</option>
            {propertiesData?.properties?.map(property => (
              <option key={property.id} value={property.id}>{property.name} - {property.address}, {property.city}</option>
            ))}
          </select>
          {errors.property_id?.type === "required" && (
            <p className="text-sm text-red-700 italic">Property is required</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Capacity
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("capacity", { min: 1, required: true })}
            />
            {errors.capacity?.type === "min" && (
              <p className="text-sm text-red-700 italic">Capacity must be greater than 0</p>
            )}
            {errors.capacity?.type === "required" && (
              <p className="text-sm text-red-700 italic">Capacity is required</p>
            )}
          </div>
          
          {/* Bed Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Bed Type
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("bed_type", { required: true })}
            >
              <option value="">Select Bed Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Queen">Queen</option>
              <option value="King">King</option>
              <option value="Twin">Twin</option>
            </select>
            {errors.bed_type?.type === "required" && (
              <p className="text-sm text-red-700 italic">Bed type is required</p>
            )}
          </div>
          
          {/* Bed Count */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Bed Count
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("bed_count", { min: 1, required: true })}
            />
            {errors.bed_count?.type === "min" && (
              <p className="text-sm text-red-700 italic">Bed count must be greater than 0</p>
            )}
            {errors.bed_count?.type === "required" && (
              <p className="text-sm text-red-700 italic">Bed count is required</p>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Price (₹)
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("price", { min: 500, required: true })}
            />
            {errors.price?.type === "min" && (
              <p className="text-sm text-red-700 italic">Price must be at least ₹500</p>
            )}
            {errors.price?.type === "required" && (
              <p className="text-sm text-red-700 italic">Price is required</p>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Discount (%)
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("discount", { max: 100, min: 0, required: false })}
            />
            {errors.discount?.type === "min" && (
              <p className="text-sm text-red-700 italic">Discount must be greater than or equal 0</p>
            )}
            {errors.discount?.type === "max" && (
              <p className="text-sm text-red-700 italic">Discount cannot exceed 100%</p>
            )}
          </div>
          
          {/* Room Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Room Type
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("room_type", { required: true })}
            >
              <option value="">Select Room Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Executive">Executive</option>
              <option value="Family">Family</option>
              <option value="Presidential">Presidential</option>
            </select>
            {errors.room_type?.type === "required" && (
              <p className="text-sm text-red-700 italic">Room type is required</p>
            )}
          </div>
        </div>



        {/* Description field removed as it's redundant with property data */}
        {/* Amenities section removed as it's redundant with property data */}
        {/* Images field removed as it's redundant with property data */}

        <div className="mt-5">
          <button
            type="submit"
            disabled={isPending}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            {isPending ? <LoadingSpinner /> : "Update Room"}
          </button>
        </div>
      </form>
      <Toaster position="top-center" />
    </div>
  );
}

export default EditRoom;