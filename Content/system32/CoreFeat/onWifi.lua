-- Checks if the device is connected to a network and notifies the user if not.
-- @return boolean Returns true if online, false otherwise.
function checkConnectionStatus()
  local isOnline = os.execute("ping -c 1 8.8.8.8 > /dev/null 2>&1") == 0

  if not isOnline then
    local offlineMessage = "You are not connected to the internet. Please check your Wi-Fi or network settings."

    -- Notify the user via print (as Lua doesn't have alert)
    print(offlineMessage)

    -- Log for debugging purposes
    io.stderr:write("Connectivity Check: " .. offlineMessage .. "\n")
  end

  return isOnline
end
