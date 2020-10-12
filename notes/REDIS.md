# Redis Notes: Creating and Managing Cloud Native Services in Kubernetes

## Installing Redis with Helm

To take advantage of a pre-configured Redis setup with a metrics exporter, for this milestone I've chosen
to use the Bitnami Redis Helm Chart. This configuration for the chart is in `k8s/redis`.

It's also an option to install a release of the chart into its own namespace and use that from the `sns` 
namespace. Having the services read the Redis host/port from a configuration file allows this flexibility.

Here are the commands to install the Redis Helm Chart into the `sns` namespace:

```
cd k8s/redis
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install sns bitnami/redis -f ./values.yaml --namespace=sns
```
