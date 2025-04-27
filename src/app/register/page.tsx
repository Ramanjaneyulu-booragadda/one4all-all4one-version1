"use client";

/**
 * RegisterPage Component
 * ----------------------
 * A modern, TypeScript-based registration form for Next.js App Router.
 * Includes full form state management, validation, and backend API integration.
 */

import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useTheme } from "@/context/ThemeContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";

// Constants/utilities (make sure these exist or replace with mock data)
import {
  GENDER_OPTIONS,
  NATIONALITY_OPTIONS,
  INITIAL_VALUES,
  registrationUrl,
  ONE4ALL_USER_RO,
  ONE4ALL_ADMIN_RW,
} from "../../utils/constants";
import { validationUtils } from "../../utils/validationUtils";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { Toast } from "../../components/ui/Toast";

// Types for form values
interface FormData {
  fullName: string;
  gender: string;
  dob: string;
  address: string;
  pincode: string;
  mobileNo: string;
  email: string;
  nationality: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const { theme } = useTheme(); // To get the current theme
  const pathname = usePathname(); // 👈 Used to infer "user" vs "admin"
  const role = pathname.startsWith("/admin")
    ? ONE4ALL_ADMIN_RW
    : ONE4ALL_USER_RO; // 🔄 Dynamic role
  const authFetch = useAuthFetch();
  const params = useParams();
  const ref = (params as any)?.ref || "";
  const name = (params as any)?.name || "";

  const [formData, setFormData] = useState<FormData>(INITIAL_VALUES);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const [successData, setSuccessData] = useState<{
    emailid: string;
    MemberID: string;
    Mobile: string;
  } | null>(null);

  const validateForm = (data: FormData): string[] => {
    const errors = [
      ...validationUtils.validateGender(data.gender),
      ...validationUtils.validateAge(data.dob),
      ...validationUtils.validateNumber(data.pincode, "Pincode"),
      ...validationUtils.validateNumber(data.mobileNo, "Mobile Number"),
      ...validationUtils.validatePasswordMatch(
        data.password,
        data.confirmPassword
      ),
    ];
    setValidationErrors(errors);
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (errors.length === 0) {
      await submitRegistration(formData);
    } else {
      setShowError(true);
    }
  };

  const submitRegistration = async (data: FormData) => {
    try {
      const response = await authFetch(
        registrationUrl,
        {
          method: "POST",
          headers: {
            roles: role, // 👈 This is your custom header
          },
          body: JSON.stringify({
            ofaFullName: data.fullName,
            ofaGender: data.gender,
            ofaDob: data.dob,
            ofaAddress: data.address,
            ofaPincode: data.pincode,
            ofaMobileNo: data.mobileNo,
            ofaEmail: data.email,
            ofaNationality: data.nationality,
            ofaPassword: data.password,
            ofaCreatedBy: role,
            ofaCreatedDt: new Date().toISOString().split("T")[0],
            ofaUpdatedBy: role,
            ofaUpdatedDt: new Date().toISOString().split("T")[0],
            ofaIsDeleted: 0,
          }),
        },
        false
      );

      const result = await response.json();

      if (!response.ok) {
        const validationErrors = result.message[0]
          .validationmMessage as string[];
        setValidationErrors(validationErrors);
        setToastType("error");
        setToastMessage("Registration failed. Please fix validation errors.");
        setShowError(true);
        return;
      }

      const registrationDetails = result.message[0].RegistrationDetails;
      setSuccessData({
        emailid: registrationDetails.emailid,
        MemberID: registrationDetails.MemberID,
        Mobile: registrationDetails.Mobile,
      }); // ✅ Save data
      setToastType("success");
      setToastMessage("🎉 User Registration successful!");
      setShowSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setToastType("error");
      setToastMessage(
        "⚠️ Registration failed. Please check the form and try again."
      );
      setShowError(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100 dark:bg-gray-700 px-4 py-10">
      <div className="bg-white   dark:bg-transparent dark:border-4 dark:border-[#cdc9e4] w-full max-w-2xl rounded-lg shadow-md p-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600  dark:text-[#cdc9e4]">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Member ID"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />

          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            size="small"
            type="tel"
            onChange={(e) =>
              setFormData({ ...formData, mobileNo: e.target.value })
            }
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />
          <TextField
            label=""
            variant="outlined"
            fullWidth
            size="small"
            type="date"
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />
          {/* <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Address"
            minRows={3}
            maxRows={4}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          /> */}
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              style={{
                color: theme === "dark" ? "#cdc9e4" : "#000",
              }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => {
                setFormData({ ...formData, gender: event.target.value });
              }}
            >
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    style={{
                      color: theme === "dark" ? "#cdc9e4" : "#000",
                    }}
                  />
                }
                label="Male"
                style={{
                  color: theme === "dark" ? "#cdc9e4" : "#000",
                }}
              />
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    style={{
                      color: theme === "dark" ? "#cdc9e4" : "#000",
                    }}
                  />
                }
                label="Female"
                style={{
                  color: theme === "dark" ? "#cdc9e4" : "#000",
                }}
              />
            </RadioGroup>
          </FormControl>
          <FormTextArea
            label="Address"
            value={formData.address}
            onChange={(val) => setFormData({ ...formData, address: val })}
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
              color: theme === "dark" ? "#000" : "#fff",
            }}
          />

          <TextField
            label="Pincode"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />

          <TextField
            label="Nationality"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "",
            }}
          />

          {/* <FormSelect
            label="Nationality"
            value={formData.nationality}
            onChange={(val) => setFormData({ ...formData, nationality: val })}
            options={NATIONALITY_OPTIONS}
          /> */}

          {/* <FormField label="Ref Number" value={ref} readOnly />
          <FormField label="Name" value={name} readOnly /> */}
          {/* 🔥 Errors */}
          {showError && validationErrors.length > 0 && (
            <div className="text-red-500 text-sm space-y-1">
              {validationErrors.map((err, idx) => (
                <p key={idx}>⚠️ {err}</p>
              ))}
            </div>
          )}
          {/* ✅ Success */}
          {showSuccess && (
            <div className="text-green-600 text-sm border p-3 rounded bg-green-50 shadow-sm">
              {successMessage}
            </div>
          )}
          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color={theme === "dark" ? "warning" : "primary"}
            style={{
              backgroundColor: theme === "dark" ? "#cdc9e4" : "#5a67d8",
              color: theme === "dark" ? "#000" : "#fff",
            }}
          >
            Register
          </Button>
          {/* Redirect Link */}
          <p className="text-sm text-center mt-4 text-gray-500 dark:text-[#cdc9e4]">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
      {/* 🔔 Toast Popup */}
      {toastType && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => {
            setToastType(null);
            setToastMessage("");
            setSuccessData(null);
            if (toastType === "success") {
              window.location.href = "/login";
            }
          }}
        />
      )}
    </div>
  );
}

/* ----------------------------
 * Reusable Typed Input Components
 * ---------------------------- */

interface FormFieldProps {
  label: string;
  value: string;
  type?: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  pattern?: string;
}

const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
  pattern,
}: FormFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      pattern={pattern}
      required
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}

const FormSelect = ({ label, value, onChange, options }: FormSelectProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

interface FormTextAreaProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const FormTextArea = ({ label, value, onChange }: FormTextAreaProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-black"
    />
  </div>
);
